const { APP_MESSAGES } = require("./En");
const { ValidationError } = require('mongoose').Error;
// const { format, parse } = require('date-fns');


exports.controllerResult = ({ req, res, result, message, statusCode, totalPages }) => {
  if (result instanceof Error) {
    const errorMessage = statusCode
      ? message || result.message
      : APP_MESSAGES.SERVER_ERROR;
    return res.status(statusCode || 500).json({
      status: false,
      message: "Error: " + errorMessage,
      error: result,
    });
  } else {
    return res.status(statusCode || 200).json({
      status: true,
      ...(message ? { message: message } : {}),
      data: result,
      totalPages
    });
  }
};



