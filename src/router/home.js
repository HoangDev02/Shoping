const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeController");

router.get("/", homeController.getHomePage);
router.get("/detail/:id", homeController.getDetail);
module.exports = router;
