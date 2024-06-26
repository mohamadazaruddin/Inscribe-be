const express = require("express");
const router = express.Router();
const getUserController = require("../controller/getUser.controller");
router.get("/getUser", getUserController.getdata);

module.exports = router;
