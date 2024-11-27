import type { Mongoose } from 'mongoose'
import type { IDBOrder } from '~~/types'

export const DBOrder = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBOrder>({ 
    gate: { type: mongoose.Schema.Types.ObjectId, ref: 'Gate' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

    money: { type: Number, index: true },
    code: { type: String }, 
    token: { type: String },
    end_time: { type: Date },
    number: { type: Number },
    status: { type: Number, default: 0, index: true }, // 0-Wait 1-Success 2-Refuse,
    verify: {
      person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      time: { type: Date },
      reason: { type: String },
    }
  }, {
    timestamps: true
  })

  schema.index({ code: 'text' })

  const model = mongoose.model('Order', schema, 'Order')
  return model 
}
