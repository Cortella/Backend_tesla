const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    number: {
        type: String,
        require: [true,'impossivel cadastrar sem numero']            
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createAt: {
      type:Date,
      default: Date.now
    },
    status: {
      type: String,
      required: [true,'impossivel cadastrar sem status'],
      enum: ['created','done','complete'],
      default: 'created'
    },
    items: [{
      quantity: {
        type: Number,
        required:[true,'impossivel cadastrar sem quantidade'],
        default: 1
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    }]
    
    
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order