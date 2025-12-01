import jwt from "jsonwebtoken";
import { AppError } from "../utils/common/AppError.js";
import { BaseAuth } from "../modules/auth/model/baseAuth.model.js";
import { JWT_SECRET } from "../envConfig.js"

// ---------------------------------------
// 🔐 MAIN AUTH MIDDLEWARE (for all users)
// ---------------------------------------
export const authenticate = (allowedRoles = []) => {
    console.log("🚀 ~ authenticate ~ allowedRoles:", allowedRoles)
    return async (req, res, next) => {
        try {
            // 1️⃣ Read token from cookies or Authorization header
            const token =
                req.cookies?.auth_token ||
                req.headers["authorization"]?.replace("Bearer ", "");
            console.log("🚀 ~ authenticate ~ token:", token)

            if (!token) {
                throw new AppError("Unauthorized: No token provided", 401);
            }

            // 2️⃣ Verify token
            const decoded = jwt.verify(
                token,
                JWT_SECRET
            );

            // 3️⃣ Fetch the BaseAuth user
            const userId = decoded.id || decoded._id;
            // console.log("🚀 ~ authenticate ~ userId:", userId)
            const user = await BaseAuth.findById(userId).select("-password");
            // console.log("🚀 ~ authenticate ~ user:", user)

            if (!user) {
                throw new AppError("User not found or invalid token", 401);
            }

            // 4️⃣ Role-based authorization (optional)
            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                throw new AppError("Forbidden: Insufficient permissions", 403);
            }

            // 5️⃣ Attach user to request
            req.user = user;

            next();
        } catch (err) {
            next(new AppError(err.message || "Authentication failed", 401));
        }
    };
};
