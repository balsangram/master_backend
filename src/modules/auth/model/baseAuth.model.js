import mongoose from "mongoose";
import crypto from "crypto";

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
        }
    },
    options
)

// 🔐 Function to hash password using Node's native crypto
function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

// 🔥 Pre-save hook to hash password
BaseAuthSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.password = hashPassword(this.password);
    next();
});

// 🔍 Compare entered password with hashed password
BaseAuthSchema.methods.comparePassword = function (enteredPassword) {
    console.log(enteredPassword,"enteredPassword")
    const hashed = hashPassword(enteredPassword);
    console.log("hashed",hashed)
    console.log("this.password",this.password)
    return hashed === this.password;
};

export const BaseAuth = mongoose.model("BaseAuth", BaseAuthSchema);
