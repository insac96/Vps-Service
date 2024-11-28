import type { Mongoose } from 'mongoose'
import type { IGlobalDB } from '~~/types'

import { DBConfig } from './config'
import { DBUser, DBUserCart, DBUserTax } from './user'
import { DBLogAdmin, DBLogUser, DBLogLogin } from './log'
import { DBGate } from './gate'
import { DBProduct } from './product'
import { DBCategory } from './category'
import { DBOrder } from './order'

export default (mongoose : Mongoose) : IGlobalDB => {
  return {
    Config: DBConfig(mongoose),
    Gate: DBGate(mongoose),
    User: DBUser(mongoose),
    UserTax: DBUserTax(mongoose),
    UserCart: DBUserCart(mongoose),
    Product: DBProduct(mongoose),
    Category: DBCategory(mongoose),
    Order: DBOrder(mongoose),
    LogUser: DBLogUser(mongoose),
    LogAdmin: DBLogAdmin(mongoose),
    LogLogin: DBLogLogin(mongoose)
  }
}