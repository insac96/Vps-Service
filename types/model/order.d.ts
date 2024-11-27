import type { Types } from 'mongoose'
import type { IDBGate } from './gate'
import type { IDBUser } from './user'
import type { IDBProduct } from './product'

export interface IDBOrder {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  gate: Types.ObjectId | IDBGate
  user: Types.ObjectId | IDBUser
  product: Types.ObjectId | IDBProduct

  money: number
  number:number

  code: string
  token: string
  end_time: Date
  status: number
  
  verify: {
    person: Types.ObjectId
    time: Date
    reason: string
  }
}