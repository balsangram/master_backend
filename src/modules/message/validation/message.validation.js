import Joi from "joi";

function validationSendMesaage() {
    const schema = Joi.object({
        message: Joi.string()
    })
    return schema;
}

function validationEditMessage() {
const schema = Joi.object({
        message: Joi.string()
    })
    // console.log("🚀 ~ validationEditMessage ~ schema:", schema)
    return schema;
}

export const mnessageValidation = {
    validationSendMesaage: validationSendMesaage(),
    validationEditMessage: validationEditMessage()
}