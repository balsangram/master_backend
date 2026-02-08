import { ApiResponse } from "../../../utils/common/ApiResponse";
import { asyncHandler } from "../../../utils/common/asyncHandler";
import {artist_services} from "../services/artist.services"
export const getAllArtistsController = asyncHandler(async (req, res) => {
  const allArtists = await artist_services.getAllArtists();

  return res
    .status(200)
    .json(ApiResponse(200, allArtists, "All artists displayed"));
});

const addNewArtists = asyncHandler(async (req, res) => {

})

const modifiedArtistDetaisl = asyncHandler(async (req, res) => {

})

const deleteArtist = asyncHandler(async (req, res) => {

})

export {
    displayArtists,
    addNewArtists,
    modifiedArtistDetaisl,
    deleteArtist
}