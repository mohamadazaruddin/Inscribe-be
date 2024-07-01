const Post = require("../models/Post");
const User = require("../models/User");
const createPost = (req, res) => {
  let userId;
  const { content } = req.body;

  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(204).json({ message: "User Not Found" });
      }
      const newPost = new Post({
        user: user._id,
        content: content,
      });
      newPost
        .save()
        .then((post) => {
          res.status(201).json({ message: "Post Created Successfully", post });
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

const getUserPost = (req, res) => {
  const userId = req.params.id;
  try {
    Post.find({ user: userId }).then(async (user) => {
      if (!user.length > 0) {
        res.status(200).json({ message: "No Post Found" });
      }
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getLatestPost = async (req, res) => {
  const { query } = req.query;
  try {
    let posts;
    if (query === "newest") {
      posts = await Post.find().sort({ createdAt: -1 });
    } else if (query === "following") {
      User.findById(req.params.id).then(async (user) => {
        if (!user) {
          return res.status(204).json({ message: "User Not Found" });
        }
        const following = user.following; // Assuming following is an array of user IDs
        posts = await Post.find({ user: { $in: following } }).sort({
          createdAt: -1,
        });
      });
    } else {
      return res.status(400).json({
        message: "Invalid query parameter, only 'new' or 'following' allowed",
      });
    }
    res.status(200).json({ posts });

    // Post.find().then((post) => {
    //   res.status(200).json(post);
    // });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  console.log(postId, userId, "postIduserId");
  try {
    User.findById(userId).then(async (user) => {
      if (!user) {
        return res.status(204).json({ message: "User Not Found" });
      }

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { likes: user._id } },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({
        message: "Post liked successfully",
        likes: updatedPost.likes,
      });
    });
  } catch (error) {
    res.status(500).send();
  }
};

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;
  try {
    User.findById(userId).then(async (user) => {
      if (!user) {
        return res.status(204).json({ message: "User Not Found" });
      }

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { comments: { comment: comment, user: user._id } } },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({
        message: "Comments added successfully",
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createPost,
  getUserPost,
  getLatestPost,
  likePost,
  addComment,
};
