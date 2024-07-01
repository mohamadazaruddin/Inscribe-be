const Save = require("../models/Saved");
const addToSaved = async (req, res) => {
  try {
    await Save.create({
      post: "668272bd843c5e94eaa21ad0",
      user: "6681bb9e0eea41808f070e1c",
    });
    res.json({ sucess: true, message: "Saved successfully" });
  } catch (err) {}
};

module.exports = { addToSaved };
