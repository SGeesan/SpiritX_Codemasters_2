const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  players: [],

}, {timestamps: true});     


const teamModel = mongoose.model('teams', teamSchema);

module.exports = teamModel;
