const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    product_name: {
      type: String
    },
    item_id: {
      type: String
    },
    price: {
      type: String
    }
  },
  { collection: "products" }
);

module.exports = mongoose.model("products", product);