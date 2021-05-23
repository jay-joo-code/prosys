import { IDocument } from './index.type'

export interface ITask extends IDocument {
  userId: string
  isComplete: boolean
  startTime: string
  endTime: string
  name: string
  due: Date
  notes: string
}

export interface IScheduleTasks {
  [id: string]: ITask[]
}
