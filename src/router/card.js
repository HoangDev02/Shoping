const express = require("express");
const router = express.Router();
const cardControll = require('../app/controller/cardController')

router.get('/', cardControll.getCart);
router.get('/:id', cardControll.getCarts);
router.post('/create', cardControll.addCart)

module.exports = router