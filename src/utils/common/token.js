import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/envConfig.js";

export function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role || "user"
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
}

export function generateRefreshToken(user) {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
}
