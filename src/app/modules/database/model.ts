'use strict'
import { Schema } from 'mongoose'

export const UserSchema: Schema = new Schema(
  {
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
