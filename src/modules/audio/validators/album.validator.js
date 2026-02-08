import Joi from "joi";

export const createAlbumSchema = Joi.object({
  name: Joi.string().trim().required(),
  artist: Joi.string().required(),   
  genre: Joi.string().optional(),
  coverImg: Joi.string().uri().optional()
});
