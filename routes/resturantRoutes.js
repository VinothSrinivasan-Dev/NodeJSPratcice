const express = require("express");

const authMiddleware = require("../middlewars/authMiddleware");
const {
  createResturantController,
  getAllRestaurantsController,
  getRestaurantById,
} = require("../controller/resturantController");

const router = express.Router();

//routes
//Create Resturant || POSt
router.post("/create", authMiddleware, createResturantController);

//Get All Restaruants

router.get("/getAll", authMiddleware, getAllRestaurantsController);

//Get Restarurant By id

router.get("/get/:id", authMiddleware, getRestaurantById);
module.exports = router;
