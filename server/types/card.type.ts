import { Document } from 'mongoose'
import { ITagDocument } from './tag.type'

export interface ICodableTextareaBlock {
  type: 'TEXT' | 'CODE'
  value: string
}

export interface ICardDocument extends Document {
  userId: string
  question: ICodableTextareaBlock[]
  answer: ICodableTextareaBlock[]
  isLearning: boolean
  isDeleted: boolean
  tags: ITagDocument[]
  repAt: Date
  repSpace: number
  repCount: number
}
