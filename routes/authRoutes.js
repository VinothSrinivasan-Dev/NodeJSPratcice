const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

//routes

router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

module.exports = router;
