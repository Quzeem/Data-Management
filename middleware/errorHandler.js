const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => {
  let err = {
    ...error
  };
  err.message = error.message;

  // console.log(error); // For debugging purpose

  // Handles Mongoose bad ObjectId
  if (error.name === "CastError") {
    const message = `Bootcamp with Id ${error.value} not found`;
    err = new ErrorResponse(message, 404);
  }

  // Handles Mongoose bad ObjectId
  if (error.code === 11000) {
    const message = "Duplicate value entered";
    err = new ErrorResponse(message, 400);
  }

  // Mongoose Validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    err = new ErrorResponse(message, 400);
  }

  return res.status(err.statusCode || 500).json({
    error: err.message || "Server Error!",
  });
};

module.exports = errorHandler;