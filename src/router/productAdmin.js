const  express = require('express')
const router = express.Router()
const StoreProductControll = require('../app/controller/ProductAdminController')
const middleware = require('../app/middleware/middleware')

router.get('/products',middleware.verifyUser ,StoreProductControll.index)

module.exports = router