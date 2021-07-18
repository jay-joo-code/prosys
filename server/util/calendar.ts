import { Request, Response } from 'express'
import { google } from 'googleapis'
import Task from '../models/Task'
import { getDateByDayDifference, getTimeStamp } from './date'
import { ITask } from '../types/task.type'

export const syncCalendar = async (req: Request, res: Response) => {
  try {
    const OAuth2 = google.auth.OAuth2
    const oAuth2Client = new OAuth2(
      process.env.ID_GOOGLE,
      process.env.SECRET_GOOGLE,
      `${process.env.SERVER_DOMAIN}/api/public/auth/google/callback`
    )
    oAuth2Client.setCredentials({
      refresh_token: req.user?.providerData.refreshToken,
    })

    const calendar = google.calendar({
      version: 'v3',
      auth: oAuth2Client,
    })

    const { data: primaryData } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      timeMax: getDateByDayDifference(new Date(), 14).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })
    const { data: secondaryData } = await calendar.events.list({
      calendarId: 'jj534@cornell.edu',
      timeMin: new Date().toISOString(),
      timeMax: getDateByDayDifference(new Date(), 14).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = [
      ...(primaryData?.items || []),
      ...(secondaryData?.items || []),
    ]

    const calendarTasks = await Task.find({
      userId: req.user?._id,
      provider: 'google',
    })
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

      const matchedTasks: ITask[] = []
      calendarTasks?.forEach((task) => {
        if (task?.providerTaskId === event.id) {
          matchedTasks.push(task)
        }
      })

      if (matchedTasks?.length >= 1 && event?.id) {
        // update existing tasks
        const updatePromises = matchedTasks.map(async (task, idx) => {
          if (event?.id) {
            if (idx === 0) {
              // update one
              await Task.findOneAndUpdate(
                { providerTaskId: event?.id },
                taskData
              )
              updatedTasks.push(event.id)
            } else {
              // delete duplicates
              await Task.findOneAndDelete({ providerTaskId: event?.id })
            }
          }
        })
        await Promise.all(updatePromises)
      } else {
        // create new task
        await new Task(taskData).save()
      }
    })

    await Promise.all(syncPromises)

    // delete all calendar tasks that weren't updated (likely deleted in google calendar)
    const tasksToDelete = calendarTasks.filter(
      (task) =>
        task.providerTaskId && !updatedTasks.includes(task.providerTaskId)
    )
    const deletePromises = tasksToDelete.map(async (task) => {
      await Task.findByIdAndDelete(task?._id)
    })

    await Promise.all(deletePromises)
  } catch (error) {
    res.status(500).send('Google OAuth error')
  }
}
