import { Audio } from "../model/audio.model.js";
import { Likes } from "../model/likes.model.js"
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

const findLikedTRack = async ({ userId, trackId }) => {
  console.log("hi repo")
  return await Likes.findOne({
    user: userId,
    audio: trackId
  })
}
const createTrackLikeRepo = async ({ userId, trackId }) => {
  return await Likes.create({
    user: userId,
    audio: trackId,
  });
};
const likeTrack = async ({ userId, trackId }) => {
  return await Likes.create({
    user: userId,
    audio: trackId,

  })
}

const unlikeTrack = async (likeId) => {
  return await Likes.deleteOne({ _id: likeId });
};

export const audio_repo = {
  getTrackByIdRepo,
  createTrackRepo,
  getAllTracksRepo,
  likeTrack,
  findLikedTRack,
  unlikeTrack,
  createTrackLikeRepo
}