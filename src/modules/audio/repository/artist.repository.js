import Artist from "../model/artist.model.js"
 const getAllArtists = async () => {
  return await Artist.find()
    .populate("audio")   
    .lean();
};

export const artist_repositories={
    getAllArtists
}