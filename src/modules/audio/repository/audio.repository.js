import { Audio } from "../model/audio.model";

 const createTrackRepo = async (data) => {
  return await Audio.create(data);
};

 const getAllTracksRepo = async () => {
  return await Audio.find({ isActive: true })
    .populate("artist")
    .lean();
};

 const getTrackByIdRepo = async (trackId) => {
  return await Audio.findOne({
    _id: trackId,
    isActive: true
  }).populate("artist");
};

export const audio_repo={
    getTrackByIdRepo,
    createTrackRepo,
    getAllTracksRepo
}