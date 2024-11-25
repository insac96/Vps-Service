import type { Model } from 'mongoose'
import type { IDBCategory } from './category'
import type { IDBProduct, IDBProductOption } from './product'
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
  ProductOption: Model<IDBProductOption>
  
  LogAdmin: Model<IDBLogAdmin>
  LogUser: Model<IDBLogUser>
  LogLogin: Model<IDBLogLogin>
}