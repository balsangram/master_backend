import { albumRepository } from "../repository/album.repository";
const createAlbum=async(payload)=>{
    return await albumRepository.createAlbumRepo(payload)
}
const getAllAlbums=async(payload)=>{
    return await albumRepository.getAllAlbums()
}
export const album_service={
    createAlbum,
    getAllAlbums
}