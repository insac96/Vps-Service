import type { Mongoose } from 'mongoose'
import { IDBOS } from '../../../types/model/os';

export const DBOS = (mongoose : Mongoose) => {
    const schema = new mongoose.Schema<IDBOS>({ 
      name: { type: String },
      display: { type: Boolean, default: true },
    }, {
      timestamps: true
    })
    const model = mongoose.model('OS', schema, 'OS')
    return model 
  }