const restaurantModel = require("../models/restaurantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      raingCount,
      coords,
    } = req.body;
    //Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and Address",
      });
    }
    const newResturant = await restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      raingCount,
      coords,
    });
    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Resturant Api",
      err,
    });
  }
};

//get All Restarurants

const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get All Resturant Api",
      err,
    });
  }
};

//get Restaurant by Id
const getRestaurantById = async (req, res) => {
  try {
    const restaurants = await restaurantModel.findById(req.params.id);
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Available",
      });
    }
    res.status(200).send({
      success: true,
      //   totalCount: restaurants.length,
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get Resturant Api",
      err,
    });
  }
};

module.exports = {
  createResturantController,
  getAllRestaurantsController,
  getRestaurantById,
};
