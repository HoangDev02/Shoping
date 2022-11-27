const products = require('../models/products')
const {mongooseToObject, mutipleMongooseToObject} = require('../../../utils/mongoose')
const allProductControll = {
    index: (req,res,next) => {
        products.find({})
        .then(product => {
            res.render('productAdmin/store_product', { product: mutipleMongooseToObject(product)})
        })
        .catch(next)
    }
}
module.exports = allProductControll