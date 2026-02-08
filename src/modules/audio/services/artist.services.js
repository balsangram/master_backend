import { artist_repositories } from "../repository/artist.repository";
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
export const artist_services={
    getAllArtists
}