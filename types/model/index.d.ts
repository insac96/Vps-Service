import type { Model } from 'mongoose'
import type { IDBCategory } from './category'
import type { IDBProduct } from './product'
import type { IDBOrder } from './order'
export { IDBConfig, IDBConfigStore } from './config'
export { IDBUser, IDBUserStore } from './user'
export { IDBGate } from './gate'
export { IDBLogAdmin, IDBLogLogin, IDBLogUser } from './log'

export interface IGlobalDB {
  Config: Model<IDBConfig>

  User: Model<IDBUser>

  Gate: Model<IDBGate>
  Category: Model<IDBCategory>
  Product: Model<IDBProduct>
  Order: Model<IDBOrder>
  LogAdmin: Model<IDBLogAdmin>
  LogUser: Model<IDBLogUser>
  LogLogin: Model<IDBLogLogin>
}