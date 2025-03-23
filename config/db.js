const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to DataBase ${mongoose.connection.host}`,
      colors.bgYellow
    );
  } catch (err) {
    console.log("DB error ", err, colors.bgRed);
  }
};

module.exports = connectDb;
