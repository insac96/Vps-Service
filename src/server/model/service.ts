import type { Mongoose } from 'mongoose'
import { IDBService } from './../../../types/model/service.d';
export const DBService = (mongoose : Mongoose) => {
    const schema = new mongoose.Schema<IDBService>({ 
      order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      os: { type: mongoose.Schema.Types.ObjectId, ref: 'OS' },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      server: { type: String },
      quantity: { type: Number },
      number: { type: Number },
      money: { type: Number },
      end_time: { type: Date },
      info: { type: Array },
      status: { type: Number , default: 0 },
    }, {
      timestamps: true
    })
  
    const model = mongoose.model('Sevice', schema, 'Sevice')
    return model
  }