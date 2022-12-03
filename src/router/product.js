const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController');
const middleware = require('../app/middleware/middleware')

router.get('/', productController.getProduct)
router.get('/search', productController.search)
router.get('/search/:key', productController.productSearch)
router.get('/create', middleware.verifyUser,productController.create)
router.post('/create', productController.createProduct)
router.get('/:id/edit', middleware.verifyUser,productController.editProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/:id',middleware.verifyUser, productController.deleteProduct)
router.get('/', middleware.verifyUser ,productController.getProducts)
module.exports = router
