const  express = require('express')
const router = express.Router()
const StoreProductControll = require('../app/controller/ProductAdminController')
const middleware = require('../app/middleware/middleware')

router.get('/' ,StoreProductControll.index)

module.exports = router