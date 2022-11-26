const express = require('express')
const router = express.Router()
const authController = require('../app/controller/AuthController')

router.get('/register', authController.register)
router.get('/login', authController.login)

router.post('/register', authController.isregister)
router.post('/login', authController.islogin)

module.exports = router;