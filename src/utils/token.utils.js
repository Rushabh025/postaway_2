import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, tokenVersion: user.tokenVersion }, // Attach latest tokenVersion
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Adjust expiration as needed
    );
};
