const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    item_id: {
      type: Number, 
      required: true, 
    },
    reviews: Number,
    rating: {
      type: Number,
      max: 5,
    },
    availability: String, 
    price: {
      type: Number,
      required: true, 
    },
    images: Array, 
    ages: String,
    pieces: Number,
  },
  { collection: "products" }
);

module.exports = mongoose.model("products", product);