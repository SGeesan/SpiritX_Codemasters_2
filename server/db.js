// dbconfig.js
const mongoose = require("mongoose");

// Import Player model for use in queries
const Player = require("./models/player");

// Import Team model for use in queries
const Team = require("./models/teams");

// Connect to MongoDB
const mongoURL =
 //Add your Mongo URI
mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Error connecting to database");
});

connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});



// Function to get all players from the database
const getAllPlayers = async () => {
  try {
    const players = await Player.find();
    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

const createPlayer = async (playerData) => {
  try {
    const player = new Player(playerData);
    await player.save();
    return player;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

const updatePlayer = async (playerId, playerData) => {
  try {
    const player = await Player.findByIdAndUpdate(playerId, playerData, {
      new: true,
    });
    if (!player) {
      throw new Error("Player not found");
    }
    return player;
  } catch (error) {
    console.log("error updating the player:", error);
    throw error;
  }
};

const deletePlayer = async (playerId) => {
  try {
    const player = await Player.findByIdAndDelete(playerId);
    if (!player) {
      throw new error("Player deleted successfully");
    }
  } catch (error) {
    console.log("error deleting the player:", error);
    throw error;
  }
};

const getAllTeams = async () => {
  try {
    const teams = await Team.find();
    return teams;
  } catch (error) {
    console.log("error fetching teams:", error);
    throw error;
  }
};
// Export the function to use in the route
module.exports = {
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getAllTeams,
};
