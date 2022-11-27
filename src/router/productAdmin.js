const  express = require('express')
const router = express.Router()
const allProductControll = require('../app/controller/allProductController')

router.get('/' , allProductControll.index)

module.exports = router