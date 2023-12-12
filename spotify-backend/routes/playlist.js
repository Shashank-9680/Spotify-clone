const express = require("express");
const router = express.Router();
const { Playlist } = require("../model/Playlist");
const passport = require("passport");
const { User } = require("../model/User");
const { Song } = require("../model/Song");
// const User = require("../model/User");
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentuser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentuser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("json", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid Id" });
    }
    return res.status(200).json(playlist);
  }
);
router.get(
  "/get/artist/:artistId",
  passport.authenticate("json", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;
    const artist = User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(304).json({ err: "Invalid Artist Id" });
    }

    const playlist = await Playlist.find({ owner: artistId });

    return res.status(200).json({ data: playlist });
  }
);
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentuser = req.user;
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      res.status(304).json({ err: "Playlist does not exist" });
    }
    if (
      !playlist.owner.equals(currentuser._id) &&
      !playlist.collaborators.include(currentuser._id)
    ) {
      return res.status(400).json({ err: "Not allowed" });
    }
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      res.status(304).json({ err: "Song doesnt exist" });
    }
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
  }
);
exports.router = router;
