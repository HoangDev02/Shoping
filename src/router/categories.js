const express = require('express')
const router = express.Router()
const categoriesController = require('../app/controller/categoriesController');

router.post('/create', categoriesController.createCategories)
router.put('/update/:id', categoriesController.updateCategories)
router.delete('/delete/:id', categoriesController.deleteCategories)
module.exports = router
