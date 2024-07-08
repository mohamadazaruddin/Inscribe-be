const {
  getUserData,
  createUser,
  login,
  follow,
  getAllUser,
  getActivity,
  searchByUsername,
} = require("../services/user.service");

exports.getdata = (req, res) => {
  getUserData(req, res);
};

exports.createUser = (req, res) => {
  createUser(req, res);
};

exports.userLogin = (req, res) => {
  login(req, res);
};

exports.follow = (req, res) => {
  follow(req, res);
};
exports.getAllUser = (req, res) => {
  getAllUser(req, res);
};
exports.searchByUsername = (req, res) => {
  searchByUsername(req, res);
};
exports.getActivity = (req, res) => {
  getActivity(req, res);
};
