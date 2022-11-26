const product = require('../models/products')

const productController = {
    //post
    createProduct: async(req,res,next) => {
        const newProduct = new product(req.body);
        try {
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        } catch(err) {
            next(err)
        }
    },
    //put
    updateProduct: async(req,res,next) => {
        try {
            const updateProduct = await product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updateProduct)

        }catch (err) {
            next(err)
        }
    },
    //delete
    deleteProduct: async(req,res,next) => {
        try {
        await product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been delete.")
        }catch(err) {
            next(err)
        }
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
