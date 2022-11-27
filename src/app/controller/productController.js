const product = require('../models/products')
const {mongooseToObject} = require('../../../utils/mongoose')
const productController = {

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
    editProduct: async(req,res,next) => {
        product.findById(req.params.id)
        .then(product => res.render('products/updateProduct', {
            product: mongooseToObject(product)
        }))
        .catch(next)
    },
    //put
    updateProduct: async(req,res,next) => {
        product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(() => res.redirect('/'))
        .catch(next)
    },
    //delete
    deleteProduct: async(req,res,next) => {
        product.findByIdAndDelete(req.params.id)
        .then(() =>res.redirect('back'))
        .catch(next)
    },
    //get
    getProduct: async(req,res,next) => {
        try {
           const products = await product.findById(req.params.id)
           res.status(200).json(products)
        }catch(err) {
            next(err)
        }
    },
    //get
    getProducts: async(req,res,next) => {
        try {
            const products = await product.find(req.body);
            res.status(200).json(products)
        }catch(err) {
            next(err)
        }
    }
}

module.exports =  productController;
