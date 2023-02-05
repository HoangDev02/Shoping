const product = require('../models/products')
const {mongooseToObject,mutipleMongooseToObject} = require('../../../utils/mongoose')
const productController = {
    //admin  //get 
    create: async(req,res,next) => {
        res.render('products/createProduct')
    },
    //admin  //post  
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
    getProduct: async (req, res) => {
        await product.find()
        .then((products) => {
          res.render('products/showProduct', {
            products: mutipleMongooseToObject(products),
          });
        });
      },
    //get
    getProducts: async(req,res,next) => {
        try {
            const products = await product.find(req.body);
            res.status(200).json(products)
        }catch(err) {
            next(err)
        }
    },
    search: async (req, res) => {
        await product.find(
            {
                "$or": [
                    {name:{$regex:req.query.search}},
                ]
            }
        )
        .then((products) => {
          res.render('products/showProduct', {
            products: mutipleMongooseToObject(products),
          });
        });
      },
    productSearch: async(req,res,next) => {
        product.find(
        {
            "$or": [
                {name:{$regex:req.params.key}},
            ]
        }
        )
        .then((products) => {
          res.render('products/showProduct', {
            products: mutipleMongooseToObject(products),
          })
        })
        .catch(error => {
          next(error)
        }) 
    }
}

module.exports =  productController;
