const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controller/userController");
const authMiddleware = require("../middlewars/authMiddleware");

const router = express.Router();

//routes
//GET user data | GET
router.get("/getUser", authMiddleware, getUserController);

//Update Profile
router.put("/updateUser", authMiddleware, updateUserController);

//update Password

router.post("/updatePassword", authMiddleware, updatePasswordController);

//Reset Password

router.post("/resetPassword", authMiddleware, resetPasswordController);

//Delete User

router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
