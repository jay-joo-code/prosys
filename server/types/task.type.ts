import { Document } from 'mongoose'

export interface ITaskDocument extends Document {
  userId: string
  isComplete: boolean
  startTime: string
  endTime: string
  name: string
  due: Date
  notes: string
}

export interface IScheduleTasks {
  [id: string]: ITaskDocument[]
}
