const mongoose = require("mongoose");
const Stats = require("./stats");
const Schema = mongoose.Schema;

const profile = new Schema({
  username: { type: String, required: true, unique: true },
  facebookId: { type: String, unique: true, default: "" },
  photoUrl: {
    type: String,
    default:
      "https://tictaeonline.s3.ca-central-1.amazonaws.com/user-profile-male-logo.jpg"
  },
  stats: {
    type: Schema.Types.ObjectId,
    ref: "Stats",
    default: () => {
      const statsobject = new Stats();
      statsobject.save();
      return statsobject.id;
    }
  },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profile);
