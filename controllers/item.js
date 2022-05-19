/**
 * This file contain the functions to handle all requests on route /item
 */
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Item = require("../models/Item");
const Warehouse = require("../models/Warehouse");

// @route POST /item
// @desc Creates new Item in the database
// @access Public
exports.createNewItem = asyncHandler(async (req, res, next) => {
  const { name, category, quantity, warehouse, description } = req.body;
  let warehouseObjectId;
  if (warehouse) {
    if (!mongoose.isObjectIdOrHexString(warehouse)) {
      res.status(400);
      throw new Error("Warehouse id is not valid!");
    } else {
      const warehouseId = await Warehouse.findById(warehouse);
      if (!warehouseId) {
        res.status(400);
        throw new Error("Could not find warehouse!");
      } else {
        warehouseObjectId = warehouse;
      }
    }
  }

  const newItem = new Item({
    name,
    category,
    quantity,
    warehouse: warehouseObjectId,
    description,
  });
  const savedItem = await newItem.save();
  if (!savedItem) {
    throw new Error("Unexpected Error: Unable to save new item!");
  }
  res.status(201);
  res.send({ success: { item: savedItem } });
});

// @route GET /item/all
// @desc Get all the items in the database
// @access Public
exports.getAllItems = asyncHandler(async (req, res, next) => {
  const items = await Item.find();
  res.status(200);
  res.send({
    success: {
      items,
    },
  });
});

// @route GET /item/:itemId
// @desc Get single item from database by id
// @access Public
exports.getItem = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  const item = await Item.findById(itemId);
  if (item) {
    res.status(200);
    res.send({
      success: {
        item,
      },
    });
  } else {
    res.status(400);
    throw new Error("Item with given id is not exists!");
  }
});

// @route PATCH /item
// @desc Edit Item in the database
// @access Public
exports.editItem = asyncHandler(async (req, res, next) => {
  const { _id } = req.query;
  if (!mongoose.isObjectIdOrHexString(_id)) {
    res.status(400);
    throw new Error("Invalid item id!");
  }
  const item = await Item.findById(_id);
  if (item) {
    const { name, category, quantity, warehouse, description } = req.query;
    let warehouseObjectId;
    if (warehouse) {
      if (!mongoose.isObjectIdOrHexString(warehouse)) {
        res.status(400);
        throw new Error("Invalid warehouse Id");
      }
      const warehouseId = await Warehouse.findById(warehouse);
      if (!warehouseId) {
        res.status(400);
        throw new Error("Could not find warehouse!");
      } else {
        warehouseObjectId = warehouse;
      }
    }
    item.set({
      name,
      category,
      quantity,
      warehouse: warehouseObjectId,
      description,
    });
    const editedItem = await item.save();
    if (editedItem) {
      res.status(200);
      res.send({
        success: {
          item: editedItem,
        },
      });
    } else {
      throw new Error("Could not save edited item!");
    }
  } else {
    res.status(400);
    throw new Error("item does not exists!");
  }
});

// @route DELETE /item/:itemId
// @desc delete item from the database
// @access Public
exports.deleteItem = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  if (!mongoose.isObjectIdOrHexString(itemId)) {
    res.status(400);
    throw new Error("Item id is invalid!");
  }
  const item = await Item.findById(itemId);
  if (item) {
    Item.deleteOne({ _id: itemId }, (err) => {
      if (err) {
        throw new Error("Could not delete item!");
      }
    });
    res.status(200);
    res.send({ success: { message: "Item deleted successfuly!" } });
  } else {
    res.status(400);
    throw new Error("Could not find item in database!");
  }
});
