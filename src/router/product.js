const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController');

router.get('/create', productController.create)
router.post('/create', productController.createProduct)
router.get('/:id/edit', productController.editProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getProduct)
router.get('/', productController.getProducts)
module.exports = router
