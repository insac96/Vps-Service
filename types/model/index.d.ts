import type { Model } from 'mongoose'
import type { IDBCategory } from './category'
import type { IDBProduct } from './product'
import type { IDBOrder } from './order'
import type { IDBUser, IDBUserCart, IDBUserTax } from './user'
import type { IDBSystem } from './system'
export { IDBConfig, IDBConfigStore } from './config'
export { IDBUser, IDBUserStore } from './user'
export { IDBGate } from './gate'
export { IDBLogAdmin, IDBLogLogin, IDBLogUser } from './log'

export interface IGlobalDB {
  Config: Model<IDBConfig>

  User: Model<IDBUser>
  UserTax: Model<IDBUserTax>
  UserCart: Model<IDBUserCart>
  
  Gate: Model<IDBGate>
  Category: Model<IDBCategory>
  Product: Model<IDBProduct>
  Order: Model<IDBOrder>
  
  System: Model<IDBSystem>
  
  LogAdmin: Model<IDBLogAdmin>
  LogUser: Model<IDBLogUser>
  LogLogin: Model<IDBLogLogin>
}