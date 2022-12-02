const express = require("express");
const router = express.Router();
const cartControll = require('../app/controller/cardController')
const middleware = require('../app/middleware/middleware')
router.get('/cartUser',middleware.verifyAdmin,cartControll.getCart);
// router.get('/:id',middleware.verifyToken ,cartControll.getUser) 
router.post('/cartUser', cartControll.addCart)
router.get('/', cartControll.getCarts) 
router.delete('/:id', cartControll.deleteCart)
// router.get('/cartUser', cartControll.deleteCart)
module.exports = router 