import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { asyncHandler } from "../../../utils/common/asyncHandler.js";
import { artist_services } from "../services/artist.services.js"
const getAllArtistsController = asyncHandler(async (req, res) => {
  const allArtists = await artist_services.getAllArtists();

  return res
    .status(200)
    .json(new ApiResponse(200, allArtists, "All artists displayed"));
});

const addNewArtists = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json(new ApiResponse(400, null, "req body is empty"))
  }
  const artist = await artist_services.createArtist(req.body)
  return res.status(200).json(new ApiResponse(200, artist, "created the artist"))
}
)


const modifiedArtistDetaisl = asyncHandler(async (req, res) => {

})

const deleteArtist = asyncHandler(async (req, res) => {

})

export {
  // displayArtists,
  addNewArtists,
  modifiedArtistDetaisl,
  deleteArtist,
  getAllArtistsController
}