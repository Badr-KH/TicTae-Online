const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true }
});

module.exports = mongoose.model("User", user);
