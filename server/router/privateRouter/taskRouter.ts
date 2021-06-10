import express from 'express'
import Task from '../../models/Task'
import { syncCalendar } from '../../util/calendar'
import { isDateBeforeToday } from '../../util/date'

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
    // async fetch and save google calendar events
    syncCalendar(req, res)

    // fetch user tasks
    const docs = await Task.find({
      userId: req.user?._id,
      isComplete: false,
    }).sort({ due: 1 })

    const validatedTasks = docs
      .filter((task) => {
        // filter calendar events that are in the past
        if (
          task.due &&
          isDateBeforeToday(task.due) &&
          task.provider === 'google'
        ) {
          Task.findByIdAndUpdate(task?._id, { isComplete: true })
          return false
        }
        return true
      })
      .map((task) => {
        // set overdue task due date as today
        if (
          task.due &&
          isDateBeforeToday(task.due) &&
          task.provider !== 'google'
        ) {
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
    const doc = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
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
