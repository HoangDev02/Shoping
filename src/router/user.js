const express = require('express')
const router = express.Router()
const userController = require('../app/controller/userController')
const { verifyToken, verifyUser, authenToken } = require('../app/middleware/middleware')

// router.get('/' ,userController.getUser)
module.exports = router