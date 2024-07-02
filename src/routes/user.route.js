const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

//get all user
router.get("/", auth, function (req, res) {
  userController.getAllUser(req, res);
});
router.get("/findbyname", auth, function (req, res) {
  userController.searchByUsername(req, res);
});
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

// to follow someone
router.post("/:id/follow", auth, function (req, res) {
  userController.follow(req, res);
});

// to follow someone

module.exports = router;
