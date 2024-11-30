import type { Types } from 'mongoose'

export interface IDBOS {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  display: boolean
}
