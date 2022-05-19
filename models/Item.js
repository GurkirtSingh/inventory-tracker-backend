const mongoose = require("mongoose");
const Warehouse = require("./Warehouse");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "None",
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
  },
  description: {
    type: String,
    default: "",
  },
});

const MinQuantityValidator = function (value) {
  return value >= 0;
};
itemSchema
  .path("quantity")
  .validate(MinQuantityValidator, "Quantity should be higher or equal to zero");

module.exports = Item = mongoose.model("Item", itemSchema);
