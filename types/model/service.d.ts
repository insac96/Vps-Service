import type { Types } from 'mongoose'

export interface IDBService {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  order: Types.ObjectId | IDBOrder
  product: Types.ObjectId | IDBProduct
  os: Types.ObjectId | IDBOS
  user: Types.ObjectId | IDBUser
  server: string
  end_time: Date
  quantity: number
  number: number
  money: number
  status: number
  info: Array
}
