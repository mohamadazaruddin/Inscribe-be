const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDB = require("./src/config/db");

//  calling routes
const userRoutes = require("./src/routes/user.route");
const commentRoutes = require("./src/routes/comment.route");
const postRoutes = require("./src/routes/post.route");
//end
app.use(bodyParser.json());
mongoDB(); // Db invok
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use("/users", userRoutes);
app.use("/comment", commentRoutes);
app.use("/post", postRoutes);

module.exports = app;
