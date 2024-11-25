import type { Mongoose } from 'mongoose'
import type { IGlobalDB } from '~~/types'

import { DBConfig } from './config'
import { DBUser } from './user'
import { DBLogAdmin, DBLogUser, DBLogLogin } from './log'
import { DBGate } from './gate'
import { DBProduct, DBProductOption } from './product'
import { DBCategory } from './category'

export default (mongoose : Mongoose) : IGlobalDB => {
  return {
    Config: DBConfig(mongoose),

    User: DBUser(mongoose),

    Gate: DBGate(mongoose),

    Product: DBProduct(mongoose),
    ProductOption: DBProductOption(mongoose),
    Category: DBCategory(mongoose),

    LogUser: DBLogUser(mongoose),
    LogAdmin: DBLogAdmin(mongoose),
    LogLogin: DBLogLogin(mongoose)
  }
}