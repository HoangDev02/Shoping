const User = require('../models/user')
const Product = require('../models/products')

const {mongooseToObject,mutipleMongooseToObject} = require('../../../utils/mongoose')

const adminController = {
    //get
    home: (req,res,next) => {
        res.render('admin/home', {layout: false})
    },
    //get
    getUser: (req,res,next) => {
        User.find({})
        .then(user => {
            res.render('admin/store_user', { user: mutipleMongooseToObject(user)})
        })
        .catch(next)
    },
    //update
    editUser: async(req,res,next) => {
        User.findById(req.params.id)
        .then(user => res.render('admin/updateUser', {
            user: mongooseToObject(user)
        }))
        .catch(next)
    },
    //put
    updateUser: async(req,res,next) => {
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(() => res.redirect('/'))
        .catch(next)
    },
    //delete
    deleteUser: async(req,res,next) => {
        User.findByIdAndDelete(req.params.id)
        .then(() =>res.redirect('back'))
        .catch(next)
    },
     create: async(req,res,next) => {
        res.render('products/createProduct')
    },
    //post
    createProduct: async(req,res,next) => {
        const newProduct = new product(req.body);
        try {
            await newProduct.save()
            res.status(200).redirect('/')
        } catch(err) {
            next(err)
        }
    },
    getProducts: (req,res,next) => {
        Product.find({})
        .then(product => {
            res.render('admin/store_product', { product: mutipleMongooseToObject(product)})
        })
        .catch(next)
    },
      //delete
    deleteProduct: async(req,res,next) => {
        Product.findByIdAndDelete(req.params.id)
        .then(() =>res.redirect('back'))
        .catch(next)
    },
}
module.exports = adminController