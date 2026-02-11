import Joi from 'joi'
export const trackSchema=Joi.object({
    name:Joi.string().required(),
    img:Joi.string().optional(),
    // songUrl:Joi.string().required(),
    artist:Joi.optional(),
    isActive:Joi.boolean()
})