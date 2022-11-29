const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController');
const middleware = require('../app/middleware/middleware')


router.get('/create', productController.create)
router.post('/create', productController.createProduct)
router.get('/:id/edit', productController.editProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
router.get('/', productController.getProduct)
// router.get('/', middleware.verifyUser ,productController.getProducts)
module.exports = router
