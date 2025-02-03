const express = require("express");
const Restaurant = require("./restaurant");
const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisines: cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/restaurants", async (req, res) => {
  try {
    const sortOrder = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find({}, { _id: 1, cuisines: 1, name: 1, city: 1, restaurant_id: 1 })
      .sort({ restaurant_id: sortOrder });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ 
      cuisines: "Delicatessen", 
      city: { $ne: "Brooklyn" }
    }, { _id: 0, cuisines: 1, name: 1, city: 1 })
    .sort({ name: 1 });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
