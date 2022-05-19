const express = require("express");
const router = express.Router();
const {
  validateNewItem,
  validatedEditedItem,
} = require("../middleware/validator");

const {
  createNewItem,
  getAllItems,
  getItem,
  editItem,
  deleteItem,
} = require("../controllers/item");

router.route("/").post(validateNewItem, createNewItem);
router.route("/").get(getAllItems);
router.route("/:itemId/getOne").get(getItem);
router.route("/").patch(validatedEditedItem, editItem);
router.route("/:itemId").delete(deleteItem);

module.exports = router;
