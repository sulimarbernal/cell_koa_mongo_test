'use strict'
import { Schema, model, Document, Model } from 'mongoose'
import { ObjectId } from 'bson'

export const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
)

export interface UserMongoDocument extends Document {
  _id: ObjectId
  id: string
  status: string
  name: string
  createdAt: Date
}

export const UserModel: Model<UserMongoDocument> = model<UserMongoDocument>('user', UserSchema)
