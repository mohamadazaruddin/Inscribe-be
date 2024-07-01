const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const getUserData = (req, res) => {
  User.findById(req.params.id)
    .populate({ path: "following", model: "user" })
    .populate({ path: "followers", model: "user" })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      res.send(err);
    });
};
// register user
const createUser = (async = async (req, res) => {
  try {
    const { username, password, profilepicture } = req.body;

    User.find({ userName: username }).then(async (userExist) => {
      if (userExist.length > 0) {
        return res.status(400).json({
          message: "username already exist please try another",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        userName: username,
        password: hashedPassword,
        profileAvatar: profilepicture,
      });

      res
        .status(201)
        .json({ message: "User Registered Successfully", newUser });
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error("Error registering user", err);
  }
});

const login = (req, res) => {
  try {
    const { username, password } = req.body;
    User.find({ userName: username }).then(async (user) => {
      if (!user.length > 0) {
        res.status(400).json({ message: "Invalid Credentials" });
      }

      console.log(user[0].password);
      const isPasswordMatch = await bcrypt.compare(password, user[0].password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
        expiresIn: "5h",
      });
      res.status(200).json({ user: user[0], token });
    });
  } catch (err) {
    console.log(err, "login error");
    res.status(500).json({ message: err });
  }
};
module.exports = { getUserData, createUser, login };
