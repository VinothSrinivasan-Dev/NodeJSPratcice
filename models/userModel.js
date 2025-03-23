const mongoose = require("mongoose");

//scehma

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVz_XdPamId2_uvEeLG23zjW02eAXgZhCfoQ&s",
    },
    answer: {
      type: String,
      required: [true, "Answer is Required"],
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("User", userSchema);
