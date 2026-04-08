const env = require("../config/env");

const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error.";

  res.status(statusCode).json({
    message,
    ...(env.nodeEnv !== "production" && { stack: error.stack }),
  });
};

module.exports = { notFoundHandler, errorHandler };
