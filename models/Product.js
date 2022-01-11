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
    reviews: {
      type: Number,
    },
    rating: {
      type: Number,
      max: 5,
    },
    availability: {
      type: String, 
    },
    price: {
      type: Number,
      required: true, 
    },
    images: {
      type: Array // or mixed 
    },
    ages: {
      type: Number, // or mixed 
    },
    pieces: {
      type: Number,
    }
  },
  { collection: "products" }
);

module.exports = mongoose.model("products", product);