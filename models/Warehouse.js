const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: "None",
  },
});

module.exports = Warehouse = mongoose.model("Warehouse", warehouseSchema);
