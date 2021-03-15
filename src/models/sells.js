const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellsSchema = new Schema({
  usuario:{
    type: User,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  slug: { //Camisa Longa = camisa-longa
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true

  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  sellPrice: {
    type: Number,
    required:true
  },
  purchasePrice: {
    type:Number
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  margin: {
    type: Number,
  },
  sales: {
    type: Number,
    default: 0
  },

  tags: [{
    type: String,
    required: true
  }]
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
const Product = mongoose.model('Sells',sellsSchema)
module.exports = Product