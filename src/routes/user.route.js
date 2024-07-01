const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

// getting user by id
router.get("/:id", auth, function (req, res) {
  userController.getdata(req, res);
});

// creating user
router.post("/signup", function (req, res) {
  userController.createUser(req, res);
});

// login user
router.post("/login", function (req, res) {
  userController.userLogin(req, res);
});

module.exports = router;
