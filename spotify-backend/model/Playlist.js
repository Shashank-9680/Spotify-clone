const mongoose = require("mongoose");
const { Schema } = mongoose;
const Playlist = new Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  collaborators: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});
exports.PlaylistModel = mongoose.model("Playlist", Playlist);
