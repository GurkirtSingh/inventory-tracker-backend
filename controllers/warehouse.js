/**
 * This file contain functions to handle all the requests on route /warehouse
 */
const asyncHandler = require("express-async-handler");
const Warehouse = require("../models/Warehouse");
// @route GET /warehouse/:warehouseId/getone
// @desc Get warehouse by id
// @access Public
exports.getWarehouse = asyncHandler(async (req, res, next) => {
  const warehouseId = req.params.warehouseId;
  const warehouse = await Warehouse.findById(warehouseId);

  if (warehouse) {
    res.status(200);
    res.send({
      success: {
        warehouse,
      },
    });
  } else {
    res.status(404);
    throw new Error("Could not find warehouse!");
  }
});

// @route POST /warehouse/
// @desc Create new warehouse
// @access Public
exports.createWarehouse = asyncHandler(async (req, res, next) => {
  const { name, location, comment } = req.body;

  const newWarehouse = new Warehouse({ name, location, comment });
  const savedWarehouse = await newWarehouse.save();

  if (!savedWarehouse) {
    throw new Error("Unable to create warehouse");
  } else {
    res.status(201);
    res.send({ success: { warehouse: savedWarehouse } });
  }
});

// @route GET /warehouse
// @desc Get list of warehouses
// @access Public
exports.getAllWarehouses = asyncHandler(async (req, res, next) => {
  const allWarehouses = await Warehouse.find();
  res.status(200);
  res.send({ success: { warehouses: allWarehouses } });
});
