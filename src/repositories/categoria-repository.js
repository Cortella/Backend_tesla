const mongoose = require('mongoose')
const Categoria = mongoose.model('Categoria')

exports.get = async() => {
  const res = await Categoria.find({})
  return res
}

exports