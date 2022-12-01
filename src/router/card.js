const express = require("express");
const router = express.Router();
const cartControll = require('../app/controller/cardController')
const middleware = require('../app/middleware/middleware')
router.get('/:userId',cartControll.getCart);
// router.get('/:id',middleware.verifyToken ,cartControll.getUser) 
router.get('/', cartControll.getCarts) 
router.post('/:userId', cartControll.addCart)
router.delete('/:userId', cartControll.deleteCart)
router.get('/:userId', cartControll.deleteCart)
module.exports = router 