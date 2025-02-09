import ApplicationError from "../common/errors/ApplicationError.js";

export const errorHandler = (err, req, res, next) => {
    // Check if the error is an instance of ApplicationError
    if (err instanceof ApplicationError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  
    // If it's not an ApplicationError, log it and respond with a generic message
    console.error(err.stack); // Log stack trace for debugging
    res.status(500).json({ error: "Internal Server Error" });
};