import type { Mongoose } from 'mongoose'
import { IDBProduct, IDBProductOption } from './../../../types/model/product.d';

export const DBProduct = (mongoose : Mongoose) => {
    const schema = new mongoose.Schema<IDBProduct>({ 
      name: { type: String },
      description: { type: String },
      content: { type: String },
      og_image: { type: String },
      images: { type: [String] },
      view: { type: Number, default: 0 },
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      key: { type: String },
      pin: { type: Number, default: 0 },
      display: { type: Boolean, default: true },
    }, {
      timestamps: true
    })
  
    schema.index({ name: 'text', description: 'text', content: 'text' })
  
    const model = mongoose.model('Product', schema, 'Product')
    return model 
  }

  export const DBProductOption = (mongoose : Mongoose) => {
    const schema = new mongoose.Schema<IDBProductOption>({ 
      number: { type: Number },
      price: { type: String },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    }, {
      timestamps: true
    })
    const model = mongoose.model('ProductOption', schema, 'ProductOption')
    return model 
  }