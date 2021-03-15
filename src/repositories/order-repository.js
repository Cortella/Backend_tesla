const mongoose = require('mongoose')
const Order= mongoose.model('Order')



exports.get = async() => {
    const res = await Order.find({})
      .populate('user')
      .populate('items.product')
    return res
}

exports.create = async(data) => {
    let order = new Order(data);
    console.log(order)
    await order.save()
}

