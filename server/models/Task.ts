import { model, Schema } from 'mongoose'
import { ITaskDocument } from '../types/task.type'
import User from './User'

const taskSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: String,
    default: '0000',
  },
  endTime: {
    type: String,
    default: '0000',
  },
  name: {
    type: String,
    required: true,
  },
  due: {
    type: Date,
    default: new Date(),
  },
  tags: {
    type: [String],
    default: [],
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

taskSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

taskSchema.plugin(require('mongoose-autopopulate'))

export default model<ITaskDocument>('Task', taskSchema)
