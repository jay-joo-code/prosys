import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import taskRouter from './taskRouter'
import cardRouter from './cardRouter'
import tagRouter from './tagRouter'
import entryRouter from './entryRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

privateRouter.use('/user', userRouter)
privateRouter.use('/task', taskRouter)
privateRouter.use('/card', cardRouter)
privateRouter.use('/tag', tagRouter)
privateRouter.use('/entry', entryRouter)

export default privateRouter
