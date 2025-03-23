const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All fields",
      });
    }
    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already exists Please use different email",
      });
    }
    //hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create  a new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Registartion API",
      err,
    });
  }
};

//lOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation function
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Erro in Login API",
    });
  }
};

module.exports = { registerController, loginController };
