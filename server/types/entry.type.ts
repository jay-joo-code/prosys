import { Document } from 'mongoose'

export interface IEntryDocument extends Document {
  userId: string
  content: string
  satisfaction: number
}
