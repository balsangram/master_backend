import mongoose from "mongoose";
import bcrypt from "bcrypt";

const options = {
    discriminatorKey: "role",
    timestamps: true
}
const BaseAuthSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: false,
            trim: true
        },
        name: {
            type: String,
            required: false,
            trim: true
        },
        phone: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: false,
            trim: true
        },
        userName: {
            type: String,
            required: false,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            require: true,
            trim: true
        },
        fcmToken: {
            type: String,
            required: false,
            trim: true
        },
        googleId: String,
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
    },
    options
)

// 🔐 Function to hash password using Node's native crypto
function hashPassword(password) {
    return bcrypt.createHash("sha256").update(password).digest("hex");
}

// 🔥 Pre-save hook to hash password
const SALT_ROUNDS = 10;

// 🔥 Pre-save hook
BaseAuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
});

// 🔍 Compare password
BaseAuthSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const BaseAuth = mongoose.model("BaseAuth", BaseAuthSchema);
