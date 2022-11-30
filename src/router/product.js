const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController');
const middleware = require('../app/middleware/middleware')


router.get('/create', middleware.verifyUser,productController.create)
router.post('/create', productController.createProduct)
router.get('/:id/edit', middleware.verifyUser,productController.editProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/:id',middleware.verifyUser, productController.deleteProduct)
router.get('/all', productController.getProduct)
router.get('/all/:key', productController.productSearch)
// router.get('/', middleware.verifyUser ,productController.getProducts)
module.exports = router
