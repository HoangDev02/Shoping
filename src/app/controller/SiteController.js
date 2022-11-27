const product = require('../models/products')

class SiteController {

    ShowHome(req, res, next) {
        //hiển thị màng hình
        product.find({})
        .then( products =>  {
          res.render('home', {
            products: () => {
              return products.map(product => product.toObject())
            }
          })
        })
        .catch(error => next(error))
      }
}

module.exports = new SiteController;