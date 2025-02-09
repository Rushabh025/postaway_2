export default class ApplicationError extends Error {
    constructor(message, statusCode) {
      super(message); // Call the parent Error class constructor
      this.statusCode = statusCode; // Custom property to store HTTP status code
  
      // Capture the stack trace for debugging purposes
      Error.captureStackTrace(this, this.constructor);
    }
}  