const express = require('express')
const router = express.Router()
const authController = require('../app/controller/AuthController')
const checkAuthenticated = require('../app/middleware/checkAuthenticated')

router.get('/register',checkAuthenticated.checkNotAuthenticated ,authController.register)
router.get('/login',checkAuthenticated.checkNotAuthenticated  ,authController.login)

router.post('/register', authController.isregister)
router.post('/login', authController.islogin)

module.exports = router;