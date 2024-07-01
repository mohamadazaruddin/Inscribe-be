const { config } = require("dotenv");
const mongoose = require("mongoose");
config();
const URL = process.env.MONGO_CONN;
const mongoDB = async () => {
  await mongoose
    .connect(`${URL}`)
    .then(() => console.log("Connected Successfully"))
    .catch((err) => {
      console.error(err);
    });
};
module.exports = mongoDB;
