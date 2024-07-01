const express = require("express");
const router = express.Router();
const commentsController = require("../controller/comments.controller");
router.get("/", function (req, res) {
  commentsController.getComment(req, res);
});
router.post("/", function (req, res) {
  commentsController.createComment(req, res);
});
module.exports = router;
