import { IDocument } from './index.type'

export interface ITask extends IDocument {
  userId: string
  isComplete: boolean
  startTime: string
  endTime: string
  name: string
  due: Date | null
  notes: string
  provider?: 'google'
  providerTaskId?: string | null
  providerData?: any
}

export interface IScheduleTasks {
  [id: string]: ITask[]
}

export type IInboxState = 'CREATE' | 'NAVIGATE' | 'EDIT_NAME' | 'EDIT_NOTES' | 'EDIT_TIME' | 'EDIT_DUE'
