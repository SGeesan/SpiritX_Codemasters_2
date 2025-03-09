const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  category: { type: String, required: true },
  totalRuns: { type: Number, required: true },
  ballsFaced: { type: Number, required: true },
  inningsPlayed: { type: Number, required: true },
  wickets: { type: Number, required: true },
  oversBowled: { type: Number, required: true },
  runsConceded: { type: Number, required: true },
  isSelected: { type: Boolean, required: true, default: false },
}, {timestamps: true});

const bookingModel = mongoose.model('players', playerSchema);

module.exports = bookingModel;
