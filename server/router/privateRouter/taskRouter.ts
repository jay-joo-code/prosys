import express from 'express'
import moment from 'moment'
import Task from '../../models/Task'
import { IScheduleTasks } from '../../types/task.type'
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
    const docs = await Task.find({
      userId: req.user?._id,
      isComplete: false,
    }).sort({ due: 1 })

    // set overdue task due date as today
    const resetDue = async (_id: string) => {
      Task.findByIdAndUpdate(_id, { due: new Date() })
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
