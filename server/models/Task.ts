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
  provider: {
    type: String,
  },
  providerTaskId: {
    type: String,
  },
  providerData: {
    type: Schema.Types.Mixed,
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

/*
kind: 'calendar#event',
etag: '"3244172104810000"',
id: '4vhki4mnns3kb9oorsq9cueqo6_20210610T040000Z',
status: 'confirmed',
htmlLink: 'https://www.google.com/calendar/event?eid=NHZoa2k0bW5uczNrYjlvb3JzcTljdWVxbzZfMjAyMTA2MTBUMDQwMDAwWiBqYXNvbi5qb29AYnVuamFuZy5jby5rcg',
created: '2021-04-21T08:25:26.000Z',
updated: '2021-05-27T03:27:32.405Z',
summary: 'Contents Lab Meeting',
description: 'Contents Lab + Devops Team meeting(+점심식사)\n매주 자유롭게 참석하시면 됩니다',
location: '2캠퍼스-B1층-빠르게 대회의실 (20)',
creator: [Object],
organizer: [Object],
start: [Object],
end: [Object],
recurringEventId: '4vhki4mnns3kb9oorsq9cueqo6_R20210603T040000',
originalStartTime: [Object],
iCalUID: '4vhki4mnns3kb9oorsq9cueqo6_R20210603T040000@google.com',
sequence: 0,
attendees: [Array],
hangoutLink: 'https://meet.google.com/rro-fdkz-hdu',
conferenceData: [Object],
guestsCanModify: true,
reminders: [Object],
eventType: 'default'
*/

taskSchema.plugin(require('mongoose-autopopulate'))

export default model<ITaskDocument>('Task', taskSchema)
