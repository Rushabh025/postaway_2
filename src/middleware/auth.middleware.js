import jwt from "jsonwebtoken";
import UserModel from "../features/users/user.model.js";

const checkAuth = async (req, res, next) => {
    const token = req.cookies?.jwtToken;
    if (!token) {
        console.log("No token found");
        return res.status(401).json({ message: "Unauthorized - No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded JWT:", decoded);

        const user = await UserModel.findById(decoded.id);
        // console.log("Database user:", user);

        if (!user || user.tokenVersion !== decoded.tokenVersion) {
            console.log("Token version mismatch!", user?.tokenVersion, decoded.tokenVersion);
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default checkAuth;
