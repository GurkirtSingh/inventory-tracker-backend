const { validationResult, body, query } = require("express-validator");
exports.validateNewItem = [
  body("name", "Item name is required!!").notEmpty().isString(),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required!")
    .isInt()
    .withMessage("Quantity Should be a Number!")
    .isInt({ min: 0 })
    .withMessage("Quantity should be more than 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validatedEditedItem = [
  query("_id", "Item Id is required!").notEmpty(),
  query("name", "Item is required!").notEmpty(),
  query("quantity", "Quantity should not be less than 0")
    .notEmpty()
    .isInt({ min: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
exports.validateNewWarehouse = [
  body("name", "Warehouse name is required!").notEmpty().isString(),
  body("location", "Warehouse location is required!").notEmpty().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
