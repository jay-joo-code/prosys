import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import taskRouter from './taskRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

privateRouter.use('/user', userRouter)
privateRouter.use('/task', taskRouter)

export default privateRouter
