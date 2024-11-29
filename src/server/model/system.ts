import type { Mongoose } from 'mongoose'
import { IDBSystem } from './../../../types/model/system.d';

export const DBSystem = (mongoose : Mongoose) => {
    const schema = new mongoose.Schema<IDBSystem>({ 
      name: { type: String },
      display: { type: Boolean, default: true },
    }, {
      timestamps: true
    })
    const model = mongoose.model('System', schema, 'System')
    return model 
  }