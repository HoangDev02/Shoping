const Product = require("../models/products");
const jwt = require('jsonwebtoken');

const homeController = {
  getHomePage: async (req, res) => {
    await Product.find()
    .then((products) => {
      products = products.map((product) => product.toObject());
      // console.log(products);
      res.render("home", {
        products: products,
      });
    });
  },
  getDetail: async (req, res) => {
    const { id } = req.params;
    await Product.findById(id)
    .then((product) => {
      product = product.toObject();
      // console.log(product);
      res.render("detail", {
        product,
      });
    });
  },
  getUser: async(req,res,next) => {
    const token = req.cookies.access_token
    const kq =jwt.verify(token, process.env.JWT_ACCESS_KEY)
    var idToken = kq.username
    res.render('partials/header', {
        idToken: idToken
    })
  
}
  
};

module.exports = homeController;
