import type { Mongoose } from 'mongoose'
import type { IDBUser, IDBUserTax } from '~~/types'
import md5 from 'md5'

export const DBUser = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBUser>({ 
    username: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String },
    avatar: { type: String, default: '/images/user/default.png' },
    cccd: { type: String },
    address: { type: String },
    type: { type: Number, default: 0, index: true }, // 0 - Member, 100 - Admin,
    block: { type: Boolean, default: false }, // False, True
    token: { type: String },
    last_login: { type: Date },
  }, {
    timestamps: true
  })

  schema.index({ username: 'text', email: 'text', phone: 'text' })
  const model = mongoose.model('User', schema, 'User')

  const autoCreate = async () => {
    const admin = await model.countDocuments({username: 'admin'})
    const test123 = await model.countDocuments({username: 'test123'})
    if(admin == 0){
      await model.create({ username: 'admin', password: md5('Galvin81196@'), type: 100 })
    }
    if(test123 == 0){
      await model.create({ username: 'test123', password: 'cad40931db577dfa67ca15f02bbefc69', type: 0 })
    }
  }
  autoCreate()
  
  return model
}

export const DBUserTax = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBUserTax>({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tax_code: { type: String},
    name: { type: String},
    address: { type: String},
    email: { type: String},
  }, {
    timestamps: true
  })
  const model = mongoose.model('UserTax', schema, 'UserTax')
  return model
} 
