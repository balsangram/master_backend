import Album from "../model/album.model.js"
const createAlbumRepo = async (payload) => {
  return await Album.create(payload);
};
const findalbumById=async(albumId)=>{
    return await Album.findById(albumId)
}

const getAllAlbums=async()=>{
    return await Album.find()
}

const updateAlbum=async(albumId,payload)=>{
    return await Album.findByIdAndUpdate(albumId,payload)
}
export const albumRepository={
    createAlbumRepo,
    findalbumById,
    getAllAlbums,
    updateAlbum
}