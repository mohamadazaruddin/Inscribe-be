const { getUserData, createUser, login } = require("../services/user.service");

exports.getdata = (req, res) => {
  getUserData(req, res);
};

exports.createUser = (req, res) => {
  createUser(req, res);
};

exports.userLogin = (req, res) => {
  login(req, res);
};
