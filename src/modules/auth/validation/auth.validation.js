import Joi from "joi";

function validateRegister(data) {

    // PRINT EXACT JSON (pretty format)
    console.log(
        "📩 Incoming Request Body:\n" +
        JSON.stringify(data, null, 4)
    );

    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        email: Joi.string().email().optional(),
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

    return schema.validate(data, { abortEarly: false });
}

export const userAuthValidation = {
    validateRegister
};
