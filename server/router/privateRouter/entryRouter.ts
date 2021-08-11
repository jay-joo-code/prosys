import express from 'express'
import moment from 'moment'
import Entry from '../../models/Entry'

const entryRouter = express.Router()

entryRouter.post('/', async (req, res) => {
  try {
    const doc = await new Entry({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

entryRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Entry.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

entryRouter.get('/', async (req, res) => {
  try {
    const docs = await Entry.paginate(
      {
        userId: req.user?._id,
      },
      {
        page: req?.query?.page ? Number(req?.query?.page) : 1,
        limit: 10,
      }
    )
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

entryRouter.get('/today', async (req, res) => {
  try {
    const start = moment().startOf('day')
    const end = moment().endOf('day')
    const doc = await Entry.findOne({
      userId: req.user?._id,
      createdAt: { $gte: start, $lte: end },
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

entryRouter.put('/today', async (req, res) => {
  try {
    const start = moment().startOf('day')
    const end = moment().endOf('day')
    const doc = await Entry.findOneAndUpdate(
      {
        userId: req?.user?._id,
        createdAt: { $gte: start, $lte: end },
      },
      req.body,
      {
        new: true,
        upsert: true,
      }
    )
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

entryRouter.put('/:id', async (req, res) => {
  try {
    const doc = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

entryRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Entry.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default entryRouter
