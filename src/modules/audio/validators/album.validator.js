import Joi from "joi";

export const createAlbumSchema = Joi.object({
  name: Joi.string().trim().required(),
  artist: Joi.optional(),
  audio: Joi.optional(),
  genre: Joi.string().optional(),
  coverImg: Joi.string().uri().optional()
});
