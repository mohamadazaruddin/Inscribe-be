const GetUserData = require("../services/getUserData.service");

exports.getdata = (req, res) => {
  GetUserData(req, res);
};
