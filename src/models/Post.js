const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  createdAt: { type: Date, default: Date.now() },
  likes: [{ type: Schema.Types.ObjectId, ref: "users", required: false }],
  comments: [
    {
      comment: { type: String, required: false },
      user: [{ type: Schema.Types.ObjectId, ref: "users", required: false }],
    },
  ],
});
module.exports = mongoose.model("post", PostSchema);
