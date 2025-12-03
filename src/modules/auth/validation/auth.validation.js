import Joi from "joi";

function validateRegister() {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        email: Joi.string().email().optional(),
        username: Joi.string().min(2).max(50).optional(),
        phone: Joi.string()
            .pattern(/^[0-9]{10,15}$/)
            .optional()
            .messages({
                "string.pattern.base": "Phone number must be 10 - 15 digits"
            }),
        password: Joi.string().min(6).required(),
    })
        .or("email", "phone", "name")
        .messages({
            "object.missing": "Either email, phone or name is required"
        });

    return schema;
}

function validationLogin() {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        email: Joi.string().email().optional(),
        username: Joi.string().min(2).max(50).optional(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
            "string.pattern,base": "Phone number must be 10digits"
        }),
        password: Joi.string().min(6).required(),
    }).or("email", "phone", "name")
        .messages({
            "object.missing": "Either email, phone or name is required"
        });
    return schema;
}

function validationChangrPassword() {
    const schema = Joi.object({
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    });
    return schema;
}

function validationEditProfile() {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        email: Joi.string().email().optional(),
        userName: Joi.string().min(2).max(100).optional(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
        img: Joi.string().optional()
    });
    // console.log("🚀 ~ validationEditProfile ~ schema:", schema)
    return schema;
}


export const userAuthValidation = {
    validateRegister: validateRegister(),
    validationLogin: validationLogin(),
    validationChangrPassword: validationChangrPassword(),
    validationEditProfile: validationEditProfile(),
};
