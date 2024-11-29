import type { Types } from 'mongoose'

export interface IDBSystem {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  display: boolean
}
