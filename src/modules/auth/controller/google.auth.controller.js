import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { BaseAuth } from "../model/baseAuth.model.js";
import { JWT_SECRET } from "../../../config/envConfig.js";
import { AppError } from "../../../utils/common/AppError.js";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
console.log("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID)
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleLoginController = async (req, res, next) => {
    try {
        const { credential } = req.body;
        console.log("credential received:", credential);
        if (!credential) {
            return next(new AppError("Google credential is required", 400));
        }

        // 1️⃣ Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        console.log("ticket", ticket)
        const payload = ticket.getPayload();
        console.log("payload", payload)
        const {
            sub: googleId,
            email,
            name,
            picture,
            email_verified,
        } = payload;

        if (!email_verified) {
            return next(new AppError("Google email not verified", 401));
        }

        // 2️⃣ Find existing user
        let user = await BaseAuth.findOne({
            $or: [{ googleId }, { email }],
        });

        // 3️⃣ Create user if not exists
        if (!user) {
            user = await BaseAuth.create({
                name,
                email,
                img: picture,
                googleId,
                authProvider: "google",
                isActive: true,
                password: "GOOGLE_AUTH", // dummy (required by schema)
            });
        }

        // 4️⃣ Generate JWT (IMPORTANT: include role)
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5️⃣ Send token (cookie + response)
        res
            .cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json({
                message: "Google login successful",
                token,
                user,
            });
    } catch (error) {
        console.error("Google auth error:", error);
        next(new AppError("Google authentication failed", 401));
    }
};
