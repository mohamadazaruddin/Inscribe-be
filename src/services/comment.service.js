// const Comment = require("../models/Comments");

// const createComment = () => {
//   const userId = "6681bb9e0eea41808f070e1c"; // ObjectId of the user
//   const newComment = new Comment({
//     user: userId,
//     comment: "This is a new comment",
//   });

//   newComment
//     .save()
//     .then((comment) => {
//       console.log("Comment created:", comment);
//     })
//     .catch((error) => {
//       console.error("Error creating comment:", error);
//     });
// };

// const getComments = (req, res) => {
//   Comment.find({})
//     .populate({ path: "user", model: "user" })
//     .then((list) => {
//       res.send(list);
//     });
// };
// module.exports = { createComment, getComments };
