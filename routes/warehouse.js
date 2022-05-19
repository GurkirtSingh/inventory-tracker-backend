const express = require("express");
const router = express.Router();

const { validateNewWarehouse } = require("../middleware/validator");

const {
  createWarehouse,
  getWarehouse,
  getAllWarehouses,
} = require("../controllers/warehouse");

router.route("/").post(validateNewWarehouse, createWarehouse);
router.route("/").get(getAllWarehouses);
router.route("/:warehouseId/getOne").get(getWarehouse);

module.exports = router;
