const express = require('express')
const router = express.Router()
const adminController = require('../app/controller/adminController')
const middleware = require('../app/middleware/middleware')

router.get('/home', middleware.verifyUser, adminController.home)
router.get('/user', middleware.verifyUser,adminController.getUser)
router.get('/user/:id/edit', middleware.verifyUser,adminController.editUser)
router.post('/user/update/:id', adminController.getUser)
router.delete('/user/:id', adminController.deleteUser)

//====Product=====
router.get('/product',middleware.verifyUser ,adminController.getProducts)
router.delete('/product/:id', adminController.deleteProduct)
module.exports = router