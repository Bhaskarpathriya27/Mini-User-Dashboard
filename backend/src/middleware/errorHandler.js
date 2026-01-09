// Centralized error handler middleware
// Catches errors from routes and sends consistent JSON response
function errorHandler(err, req, res, next) {
  // Determine HTTP status code
  const status = err.status || err.response?.status || 500;

  // Build response
  const response = { error: err.message || "Internal Server Error" };

  // In development, include stack trace for debugging
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

module.exports = errorHandler;
