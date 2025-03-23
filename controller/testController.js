const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1> Able to Fetch the food from the app");
  } catch (err) {
    console.log("error in test Api ", err);
  }
};

module.exports = { testUserController };
