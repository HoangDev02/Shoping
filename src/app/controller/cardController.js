const { isValidObjectId } = require('mongoose');
const Cart = require('../models/card')
const products = require('../models/products')
const jwt = require('jsonwebtoken');

const {mutipleMongooseToObject, mongooseToObject} = require('../../../utils/mongoose')

const cardControll = {
  //get
  getCart: async (req,res,next) => {

    const userId = req.body.userId
    Cart.findOne({userId: userId})
    .then((cart) => {
      res.render('cart/store_cart', {
        cart: mongooseToObject(cart)
      })
    })
  },
  //get
  getCarts: async (req,res,next) => {
    try{
      const carts = await Cart.find(req.params.id);
      res.status(200).json(carts)
    }catch(err) {
      next(err)
    }
  },
  //Post
  addCart: async (req,res,next) => {
    const {userId,product_Id, quantity, name, price, img} = req.body;
    try {
        let cart = await Cart.findOne({userId: userId});
        let productDetails = await products.findById(product_Id)
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.product_Id == product_Id);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ product_Id: product_Id,userId , quantity, name,price,img,  total: parseInt(productDetails.price * quantity)});
        cart.subtotal = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
      }
      cart = await cart.save();
      return res.status(201).redirect("/cart/cartUser");
      // return res.status(201).send(cart);
    } else {
      await Cart.create({
        userId,
        products: [{ product_Id: product_Id, quantity, name, price ,total: parseInt(price * quantity)}],
        subtotal: parseInt(productDetails.price * quantity)
      });

      return res.status(201).redirect('/');
    }
    } catch (err) {
        next(err)
    }
  },
  deleteCart:async (req,res,next) => {
    let userId = req.body.userId
    let product_Id = req.body.product_Id;
    let cart = await Cart.findOne({ userId: userId })
    if(!cart) {
      res.status(400).redirect('/back')
    }
    let itemIndex = cart.products.findIndex(p => p.product_Id == product_Id);
    if(itemIndex >= -1) {
      cart.products.splice(itemIndex, 1);
      cart= await cart.save()
      return res.status(200).redirect('/cart/cartUser');
    }
    res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
  },

}

module.exports = cardControll