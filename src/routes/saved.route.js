const express = require("express");
const router = express.Router();
const getCommentController = require("../controller/comments.controller");

router.get("/save", getCommentController.getComment);
module.exports = router;
