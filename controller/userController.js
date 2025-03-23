//GET user Info

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Data Fetched Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      err,
    });
  }
  //   res.status(200).send("User Data");
  //   console.log(req.body.id);
};

//Update User Info

const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      err,
    });
  }
};

//Update Password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New password",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    //hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Password update api",
    });
  }
};

//Reset Password Controller
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(404).send({
        success: false,
        message: "Please Provide All fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    //hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password Api",
    });
  }
};

//Delete User

const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in delete Profile Api",
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
