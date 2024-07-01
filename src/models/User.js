const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileAvatar: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "users", required: false }],
  following: [{ type: Schema.Types.ObjectId, ref: "users", required: false }],
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("user", userSchema);
