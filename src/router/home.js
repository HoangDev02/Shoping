const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeController");
const middleware = require("../app/middleware/middleware");

router.get("/", homeController.getHomePage);
router.get('',middleware.verifyAdmin ,homeController.getUser)

router.get("/detail/:id", homeController.getDetail);
module.exports = router;
