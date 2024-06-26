const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const getUserRoutes = require("./src/routes/getUser.route");
app.use(bodyParser.json());

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

app.use("/", getUserRoutes);

module.exports = app;
