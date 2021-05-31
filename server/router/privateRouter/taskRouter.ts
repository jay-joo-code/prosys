import express from 'express'
import Task from '../../models/Task'
import { getTimeStamp, isDateBeforeToday } from '../../util/date'
import { google } from 'googleapis'

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

// get user's inbox tasks
taskRouter.get('/inbox', async (req, res) => {
  try {
    // fetch and save google calendar events
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

    const today = new Date()
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (today).toISOString(),
      timeMax: (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })

    if (data && data.items) {
      const promises = data.items.map(async (event) => {
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
        const task = await Task.findOne({ providerTaskId: event.id })

        if (task) {
          // update existing task
          await Task.findOneAndUpdate({ providerTaskId: event.id }, taskData)
        } else {
          // create new task
          new Task(taskData).save()
        }
      })

      await Promise.all(promises)
    }

    // fetch user tasks
    const docs = await Task.find({
      userId: req.user?._id,
      isComplete: false,
    }).sort({ due: 1 })

    // set overdue task due date as today
    const resetDue = async (_id: string) => {
      Task.findByIdAndUpdate(_id, {
        due: new Date(),
        startTime: '0000',
        endTime: '0000',
      })
    }

    const validatedTasks = docs.map((task) => {
      if (isDateBeforeToday(task.due)) {
        resetDue(task._id)
        return {
          ...task.toObject(),
          due: new Date(),
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
    console.log('e', e)
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
