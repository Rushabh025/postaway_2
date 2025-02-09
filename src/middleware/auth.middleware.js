export function checkAuth(req, res, next) {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send({ message: "Unauthorized: Please log in." });
    }

    // Make the userId accessible in controllers via res.locals
    res.locals.userId = userId;

    next(); // Proceed to the next middleware or route handler
}
