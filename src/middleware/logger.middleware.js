export const loggerMiddleware = (req, res, next) => {
    const { method, url, body } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url}`, body);
    next(); // Continue to the next middleware or route handler
};
