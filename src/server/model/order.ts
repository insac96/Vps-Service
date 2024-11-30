import type { Mongoose } from 'mongoose'
import type { IDBOrder,IDBOrderDetail } from '~~/types'

export const DBOrder = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBOrder>({ 
    gate: { type: mongoose.Schema.Types.ObjectId, ref: 'Gate' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    money: { type: Number, index: true },
    code: { type: String }, 
    note: { type: String }, 
    token: { type: String },
    number: { type: Number, index: true },
    end_time: { type: Date },
    status: { type: Number, default: 0, index: true }, // 0-Wait 1-Success 2-Refuse,
    verify: {
      person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      time: { type: Date },
      reason: { type: String },
    }
  }, {
    timestamps: true
  })

  schema.index({ code: 'text', note: 'text' })
  const model = mongoose.model('Order', schema, 'Order')
  return model 
}

export const DBOrderDetail = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBOrderDetail>({ 
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    os: { type: mongoose.Schema.Types.ObjectId, ref: 'OS' },
    server: { type: String },
    quantity: { type: Number },
    number: { type: Number },
    money: { type: Number },
    end_time: { type: Date },
  }, {
    timestamps: true
  })

  const model = mongoose.model('OrderDetail', schema, 'OrderDetail')
  return model
}