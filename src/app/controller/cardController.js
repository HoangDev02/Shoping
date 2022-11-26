
const Cart = require('../models/card')

const cardControll = {
  //get
  getCart: async (req,res,next) => {
    try{
      const carts = await Cart.find(req.params.id);
      res.status(200).json(carts)
    }catch(err) {
      next(err)
    }
  },
  //get
  getCarts: async (req,res,next) => {
    try{
      const carts = await Cart.findById(req.params.id);
      res.status(200).json(carts)
    }catch(err) {
      next(err)
    }
  },
  //Post
  addCart: async (req,res,next) => {
    const {userId, product_Id, quantity} = req.body;
    try {
        let cart = await Cart.findOne({ userId: userId });
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.product_Id == product_Id);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ product_Id: product_Id , quantity});
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ product_Id: product_Id, quantity}]
      });

      return res.status(201).send(newCart);
    }
    } catch (err) {
        next(err)
    }
    }
}

module.exports = cardControll