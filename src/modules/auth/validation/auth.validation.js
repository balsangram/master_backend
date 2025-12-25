import Joi from "joi";

// ================= REGISTER =================
const validationRegister = () => {
  return Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().min(2).max(50).optional(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be 10 - 15 digits",
      }),
    password: Joi.string().min(6).required(),
  })
    .or("email", "phone", "name")
    .messages({
      "object.missing": "Either email, phone or name is required",
    });
};

// ================= LOGIN =================
const validationLogin = () => {
  return Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().min(2).max(50).optional(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be 10 digits",
      }),
    password: Joi.string().min(6).required(),
  })
    .or("email", "phone", "name")
    .messages({
      "object.missing": "Either email, phone or name is required",
    });
};

// ================= CHANGE PASSWORD =================
const validationChangePassword = () => {
  return Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  });
};

// ================= EDIT PROFILE =================
const validationEditProfile = () => {
  return Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    img: Joi.string().optional(),
  });
};

// ✅ EXPORT AS ARRAYS (IMPORTANT)
export const userAuthValidation = {
  validationRegister: [validationRegister()],
  validationLogin: [validationLogin()],
  validationChangrPassword: [validationChangePassword()],
  validationEditProfile: [validationEditProfile()],
};
