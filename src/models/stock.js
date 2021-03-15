const mongoose = require('mongoose')
const Schema = mongoose.Schema
const 

const stockSchema = new Schema({
  product:{
    type: Product,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  limit: {
    type: Number
  },
  message: { 
    type: String,
    trim: true,

  },
})

/*
  {
    "name" : "camisa manga curta",
    "category" : "vestuario",
    "slug": "camisa-manga-curta",
    "description": "camisa de manga curta",
    "sellPrice": "28.99",
    "purchasePrice": "10.50",
    "tags": ["camisa","tesla"]

  }
*/
const Product = mongoose.model('Stock',stockSchema)
module.exports = Product