const { addToSaved } = require("../services/saved.service");
exports.savePost = (req, res) => {
  addToSaved();
};
