const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const getUserData = (req, res) => {
  User.findById(req.params.id)
    .populate({ path: "following", model: "user" })
    .populate({ path: "followers", model: "user" })
    .then((list) => {
      Post.find({ user: list._id }).then(async (post) => {
        const user = {
          id: list._id,
          username: list.userName,
          profilepicture: list.profileAvatar,
          followers: list.followers,
          following: list.following,
          posts: post,
          accountCreatedAt: list.accountCreatedAt,
          bio: list.bio,
        };

        res.send(user);
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
// register user
const createUser = (async = async (req, res) => {
  try {
    const { username, password, profilepicture, bio } = req.body;

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
        bio: bio,
        accountCreatedAt: Date.now(),
      });

      const user = {
        id: newUser._id,
        username: newUser.userName,
        profilepicture: newUser.profileAvatar,
      };
      res.status(201).json({ message: "User Registered Successfully", user });
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
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          user[0].password
        );
        if (!isPasswordMatch) {
          return res.status(400).json({ message: "Incorrect Password" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
          expiresIn: "5h",
        });

        const loggedInuser = {
          id: user[0]._id,
          username: user[0].userName,
          profilepicture: user[0].profileAvatar,
        };

        res.status(200).json({ loggedInuser, token });
      }
    });
  } catch (err) {
    console.log(err, "login error");
    res.status(500).json({ message: err });
  }
};

const getAllUser = async (req, res) => {
  try {
    User.find().then((user) => {
      if (!user) {
        res.status(204).json({ message: "Users Not Found" });
      }

      const users = user.map(({ _id, userName, profileAvatar }) => ({
        _id,
        userName,
        profileAvatar,
      }));

      res.status(200).json(users);
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const follow = async (req, res) => {
  try {
    const { followId } = req.body;
    User.findById(req.params.id).then((user) => {
      if (!user) {
        res.status(204).json({ message: "Provide Your userId" });
      }
      User.findById(followId).then(async (followingUser) => {
        console.log(followingUser._id, "to follow", user._id, "me");
        if (!followingUser) {
          res.status(204).json({ message: "User Not userId" });
        }
        const addtoFollow = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { following: followingUser._id } },
          { new: true }
        );

        if (!addtoFollow) {
          return res.status(404).json({ message: "Unable to Follow" });
        }
        const addtoFollowing = await User.findOneAndUpdate(
          { _id: followingUser },
          { $addToSet: { followers: user._id } },
          { new: true }
        );
        if (!addtoFollowing) {
          return res.status(404).json({ message: "Unable to Follow" });
        }
        res.status(200).json({
          message: "Followed successfully",
        });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const searchByUsername = async (req, res) => {
  try {
    const partialUsername = req.query.username;
    User.find({
      userName: { $regex: "^" + partialUsername, $options: "i" },
    }).then((user) => {
      if (!user) {
        res.status(204).json({ message: "User not Found" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUserData,
  createUser,
  login,
  follow,
  getAllUser,
  searchByUsername,
};
