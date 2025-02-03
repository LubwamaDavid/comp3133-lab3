const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
  building: { type: String, required: false },
  street: { type: String, required: true },
  zipcode: { type: String, required: false }
});


const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  cuisine: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: addressSchema, required: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
