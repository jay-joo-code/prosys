import express from 'express'
import Card from '../../models/Card'

const cardRouter = express.Router()

cardRouter.post('/', async (req, res) => {
  try {
    const doc = await new Card({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.get('/reps', async (req, res) => {
  try {
    // TODO: get user's reps
    // repAt is today or before today
    res.send('TODO')
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Card.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.get('/', async (req, res) => {
  try {
    const doc = await Card.find({
      userId: req.user?._id,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(20)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.put('/:id', async (req, res) => {
  try {
    const doc = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Card.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default cardRouter
