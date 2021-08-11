import { model, PaginateModel, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IEntryDocument } from '../types/entry.type'
import User from './User'

const entrySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    satisfaction: {
      type: Number,
      default: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

entrySchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

entrySchema.plugin(require('mongoose-autopopulate'))
entrySchema.plugin(mongoosePaginate)

const EntryModel: PaginateModel<IEntryDocument> = model<IEntryDocument>(
  'Entry',
  entrySchema
) as PaginateModel<IEntryDocument>

export default EntryModel
