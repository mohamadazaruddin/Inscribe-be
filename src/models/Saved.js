const mongoose = require("mongoose");
const { Schema } = mongoose;
const saveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  post: [{ type: Schema.Types.ObjectId, ref: "posts" }],
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("save", saveSchema);
