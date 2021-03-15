const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = async() => {
  const res = await Product.find({
  }, 'name slug sellPrice ')
  return res
}

exports.getBySlug = async(slug) => {
  const res = await Product
    .findOne({
      slug: slug,
    }, 'name description slug sellPrice tags ')
    return res
}

exports.getByTag = async(tag) => {
  const res =  await Product.find({
    tags: tag
  },'name description slug sellPrice tags ')
  return res
}


exports.create = async(data) => {
  let product = new Product(data)
  await product.save()
}


//mudar depois
exports.update = async(id,data) => {
  await Product
    .findByIdAndUpdate(id,{
      $set: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        sellPrice: data.sellPrice
      }
    })
  }

exports.delete = async(id,data) => {
  await Product
    .findOneAndRemove(id)
}
