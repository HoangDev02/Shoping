const { isValidObjectId } = require('mongoose');
const Cart = require('../models/card')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const {mutipleMongooseToObject, mongooseToObject} = require('../../../utils/mongoose')

const cardControll = {
  //get
  getCart: async (req,res,next) => {

    const userId = req.params.userId
    const use = User.exists({_id: userId})

    if(!use || !isValidObjectId(userId) || !userId) {
      res.status(404).send("wrong use")
    }
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
    let userId = req.params.userId
    let use = await User.exists({_id: userId})

    if(!use || !isValidObjectId(userId) || !userId) {
      res.status(404).send("wrong use")
    }
    const {product_Id, quantity, name, price, img} = req.body;
    try {
        let cart = await Cart.findOne({userId: userId});
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.product_Id == product_Id);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ product_Id: product_Id , quantity, name,price,img});
      }
      cart = await cart.save();
      return res.status(201).redirect('/back');
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ product_Id: product_Id, quantity, name, price}]
      });

      return res.status(201).redirect('/back');
    }
    } catch (err) {
        next(err)
    }
  },
  deleteCart:async (req,res,next) => {
    let userId = req.params.userId
    const use = User.exists({_id: userId})

    if(!use || !isValidObjectId(userId) || !userId) {
      res.status(404).send("wrong use")
    }
    let product_Id = req.body.product_Id;
    let cart = await Cart.findOne({ userId: userId })
    if(!cart) {
      res.status(400).redirect('back')
    }
    let itemIndex = cart.products.findIndex(p => p.product_Id == product_Id);
    if(itemIndex >= -1) {
      cart.products.splice(itemIndex, 1);
      cart= await cart.save()
      return res.status(200).redirect('back');
    }
    res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
  },
  // getUser: async(req,res,next) => {
  //   const token = req.cookies.access_token
  //   const kq =jwt.verify(token, process.env.JWT_ACCESS_KEY)
  //   var idToken = kq.id
  //   res.render('detail', {
  //       idToken: idToken
  //   })
  //   console.log(idToken)
  // }

}

module.exports = cardControll