import { Artist } from "../model/artist.model.js"
const getAllArtists = async () => {
    return await Artist.find()
      
};

const createArtist = async (payload) => {
    return await Artist.create(payload);
};
export const artist_repositories = {
    getAllArtists,
    createArtist
}