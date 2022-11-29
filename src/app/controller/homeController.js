const Product = require("../models/products");

const homeController = {
  getHomePage: async (req, res) => {
    await Product.find()
    .then((products) => {
      products = products.map((product) => product.toObject());
      console.log(products);
      res.render("home", {
        products: products,
      });
    });
  },
  getDetail: async (req, res) => {
    const { id } = req.params;
    await Product.findById(id).then((product) => {
      product = product.toObject();
      console.log(product);
      res.render("detail", {
        product,
      });
    });
  },
};

module.exports = homeController;
