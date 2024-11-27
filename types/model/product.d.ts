import type { Types } from 'mongoose'

export interface IDBProduct {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  number: string
  category: Types.ObjectId
  specs: Array
  og_image: string
  key: string
  images: string[]
  options: Array
  pin: number
  display: boolean
}
