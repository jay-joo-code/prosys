import express from 'express'
import { google } from 'googleapis'
import Task from '../../models/Task'
import { getDateByDayDifference, getTimeStamp, isDateBeforeToday } from '../../util/date'

const taskRouter = express.Router()

// create task
taskRouter.post('/', async (req, res) => {
  try {
    const doc = await new Task({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

const syncCalendar = async (req) => {
  const OAuth2 = google.auth.OAuth2
  const oAuth2Client = new OAuth2(
    process.env.ID_GOOGLE,
    process.env.SECRET_GOOGLE,
    `${process.env.SERVER_DOMAIN}/api/public/auth/google/callback`
  )
  oAuth2Client.setCredentials({ access_token: req.user?.providerData.accessToken, refresh_token: req.user?.providerData.refreshToken })

  const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client,
  })

  const { data: primaryData } = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    timeMax: getDateByDayDifference(new Date(), 14).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })
  const { data: secondaryData } = await calendar.events.list({
    calendarId: 'jj534@cornell.edu',
    timeMin: (new Date()).toISOString(),
    timeMax: getDateByDayDifference(new Date(), 14).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const events = [
    ...(primaryData?.items || []),
    ...(secondaryData?.items || []),
  ]

  const calendarTasks = await Task.find({ userId: req.user?._id, provider: 'google' })
  const updatedTasks: string[] = []

  const syncPromises = events.map(async (event) => {
    // create task object from calendar event
    const taskData: any = {
      userId: req.user?._id,
      providerTaskId: event.id,
      provider: 'google',
      providerData: event,
      name: event.summary,
      notes: event.description?.replace(/(<([^>]+)>)/gi, ''),
    }
    if (event?.start?.date) {
      taskData.due = new Date(event.start.date)
    } else if (event?.start?.dateTime && event?.end?.dateTime) {
      // set due, startTime, endTime
      taskData.due = new Date(event.start.dateTime)
      taskData.startTime = getTimeStamp(new Date(event.start.dateTime))
      taskData.endTime = getTimeStamp(new Date(event.end.dateTime))
    }

    // check if event exists
    const matchIdx = calendarTasks.findIndex((task) => task?.providerTaskId === event.id)

    if (matchIdx >= 0) {
      // update existing task
      await Task.findOneAndUpdate({ providerTaskId: event.id }, taskData)
      if (event.id) {
        updatedTasks.push(event.id)
      }
    } else {
      // create new task
      new Task(taskData).save()
    }
  })

  await Promise.all(syncPromises)

  // delete all calendar tasks that weren't updated (likely deleted)
  const tasksToDelete = calendarTasks.filter((task) => task.providerTaskId && !updatedTasks.includes(task.providerTaskId))
  const deletePromises = tasksToDelete.map(async (task) => {
    await Task.findByIdAndDelete(task?._id)
  })

  await Promise.all(deletePromises)
}

// get user's inbox tasks
taskRouter.get('/inbox', async (req, res) => {
  try {
    // async fetch and save google calendar events
    syncCalendar(req)

    // fetch user tasks
    const docs = await Task.find({
      userId: req.user?._id,
      isComplete: false,
    }).sort({ due: 1 })

    const validatedTasks = docs
      .filter((task) => {
        // filter calendar events that are in the past
        if (isDateBeforeToday(task.due) && task.provider === 'google') {
          Task.findByIdAndUpdate(task?._id, { isComplete: true })
          return false
        }
        return true
      })
      .map((task) => {
        // set overdue task due date as today
        if (isDateBeforeToday(task.due) && task.provider !== 'google') {
          Task.findByIdAndUpdate(task?._id, {
            due: new Date(),
            startTime: '0000',
            endTime: '0000',
          })
          return {
            ...task.toObject(),
            due: new Date(),
            startTime: '0000',
            endTime: '0000',
          }
        }
        return task
      })

    res.send(validatedTasks)
  } catch (e) {
    console.log('ERROR: ', e)
    res.status(500).send(e)
  }
})

// get all user's tasks
taskRouter.get('/', async (req, res) => {
  try {
    const docs = await Task.find({ userId: req.user?._id })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Task.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.put('/:id', async (req, res) => {
  try {
    const note = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default taskRouter
