// src/modules/admin/admin.validation.js
import Joi from "joi";

// ✅ Register Validation
const validateRegister = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().optional(),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
        password: Joi.string().min(6).required(),
        name: Joi.string().min(2).max(100).optional(),
    })
        .or("email", "phone", "name")
        .messages({
            "object.missing": "Either email, phone, or name is required",
            "string.pattern.base": "Phone number must be 10–15 digits",
        });

    return schema.validate(data);
};

// ✅ Login Validation
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().optional(),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
        password: Joi.string().min(6).required(),
        name: Joi.string().min(2).max(100).optional(),
    })
        .or("email", "phone", "name")
        .messages({
            "object.missing": "Either email, phone, or name is required",
        });

    return schema.validate(data);
};

// ✅ Change Password Validation
const validateChangePassword = (data) => {
    const schema = Joi.object({
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

// ✅ Edit Profile Validation
const validateEditProfile = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().optional(),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
        name: Joi.string().min(2).max(100).optional(),
    });

    return schema.validate(data);
};

// ✅ Export all validations
export const adminValidation = {
    validateRegister,
    validateLogin,
    validateChangePassword,
    validateEditProfile,
};
