const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const auth = require("../middleware/auth");
//get new or following post
router.get("/", auth, function (req, res) {
  postController.getNew(req, res);
});

// get post by userId
router.get("/:id", auth, function (req, res) {
  postController.getPost(req, res);
});

// add new post
router.post("/:id", auth, function (req, res) {
  postController.newPost(req, res);
});

// for like
router.post("/:postId/like", auth, function (req, res) {
  postController.like(req, res);
});

// for adding comment
router.post("/:postId/comment", auth, function (req, res) {
  postController.comment(req, res);
});

module.exports = router;
