import { model, Schema } from 'mongoose'
import { ICardDocument } from '../types/card.type'
import User from './User'

const cardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },

    isComplete: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    categories: {
      type: [String],
      default: [],
    },

    queAt: {
      type: Date,
      default: new Date(),
    },
    repSpace: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

cardSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

cardSchema.plugin(require('mongoose-autopopulate'))

export default model<ICardDocument>('Card', cardSchema)
