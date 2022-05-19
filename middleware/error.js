/**
 * This file contain functions to handle unknown route and unhandled errors
 */
const createError = require("http-errors");

/**
 *
 * @route all unknown routes
 * @desc This will return a not found error
 * @access public
 */
exports.notFound = (req, res, next) => {
  next(createError(404));
};

/**
 *
 * @route middleware to unhandle error
 * @desc This will modified response to print errors on unhandle errors
 * @access public
 */
exports.errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({ error: { message: err.message } });
};
