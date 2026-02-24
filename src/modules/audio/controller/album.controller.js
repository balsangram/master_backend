import cloudinary from "../../../config/cloudinary.js";
import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { asyncHandler } from "../../../utils/common/asyncHandler.js";
import { album_service } from "../services/album.services.js";
const create = asyncHandler(async (req, res) => {
    console.log("FILE:", req.file);
    if (!req.body) {
        return res.status(400).json(new ApiResponse(400, null, "req body is empty"))
    }
    let uploadedImage = null;

    if (req.file) {
        uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "albums"
        });
    }

    const albumdata = {
        ...req.body, coverImg: uploadedImage?.secure_url || null
    }
    const album = await album_service.createAlbum(albumdata)
    return res.status(200).json(new ApiResponse(200, album, "created the album"))
}
)

const getAllAlbums = asyncHandler(async (req, res) => {
    const allAlbums = await album_service.getAllAlbums()
    return res.status(200).json(new ApiResponse(200, allAlbums, "albums fetched successfully"))
})

export const album_controller = {
    create,
    getAllAlbums
}