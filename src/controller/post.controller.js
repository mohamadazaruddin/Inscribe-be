const {
  createPost,
  getUserPost,
  getLatestPost,
  likePost,
  addComment,
} = require("../services/post.service");
exports.newPost = (req, res) => {
  createPost(req, res);
};

exports.getPost = (req, res) => {
  getUserPost(req, res);
};

exports.getNew = (req, res) => {
  getLatestPost(req, res);
};

exports.like = (req, res) => {
  likePost(req, res);
};
exports.comment = (req, res) => {
  addComment(req, res);
};
