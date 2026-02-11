import { artist_repositories } from "../repository/artist.repository.js";
const getAllArtists = async () => {
  const artists = await artist_repositories.getAllArtists();

  if (!artists || artists.length === 0) {
    return {
      success: true,
      message: "No artists found",
      data: []
    };
  }

  return {
    success: true,
    data: artists
  };
};

const createArtist = async (payload) => {
  return await artist_repositories.createArtist(payload)
}

export const artist_services = {
  getAllArtists,
  createArtist
}