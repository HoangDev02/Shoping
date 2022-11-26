const product = require('../models/products')

const {mutipleMongooseToObject} = require('../../../utils/mongoose')
class SiteController {

    // index(req, res, next) {
    //     //hiển thị màng hình
    //     product.find({})
    //     .then( () =>  {
    //       res.send("hello word")
    //     })
    //     .catch(error => next(error))
    //   }
}

module.exports = new SiteController;