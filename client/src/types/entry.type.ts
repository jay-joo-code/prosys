import { Document } from 'mongoose'

export interface IEntry extends Document {
  userId: string
  content: string
  satisfaction: number
}
