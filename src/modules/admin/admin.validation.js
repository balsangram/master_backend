import Joi from "joi";

const validateRegister = (data) => Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).optional(),
}).validate(data)
    .or("email", "phone", "name")
    .messages({
        "object.missing": "Entire Email, phone or username is required",
    }).validate(data);

const validateLogin = (data) => Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).optional(),
}).validate(data)
    .or("email", "phone", "name")
    .messages({
        "object.missing": "Entire Email, phone or username is required",
    }).validate(data);

const validateChangePassword = (data) => Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
}).validate(data);



export { validateRegister, validateLogin, validateChangePassword };