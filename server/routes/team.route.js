const Team = require("../models/team.model");
const Player = require("../models/player.model");
const express = require("express");
const router = express.Router();


router.post("/addAPlayer", async (req, res) => {
  const { teamId, player } = req.body;

  try {
    const team = await Team.findOne({ _id: teamId });
    const player1 = await Player.findOne({ _id: player._id });

 
if (team.players.length >= 11) {
      return res.status(400).json({ message: "You can not add more than 11 players in a team!" });
    }
    
    if (!player1.isSelected) {
      team.players.push(player1); 
      player1.isSelected = true;
      await player1.save();
      await team.save();
      return res.json({ team });  // Send response and exit function here
    } else {
      
      return res.status(400).json({ message: "Player already selected" });  // Return to stop further code execution
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });  // Return to stop further code execution
  }
});

router.get("/getTeam/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await Team
      .findOne({ _id: teamId })
      .populate("players"); 
    res.json({ team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);

router.post("/removeAPlayer", async (req, res) => {
  const { teamId, player } = req.body;

  try {
    const team = await Team.findOne({ _id: teamId });  
    const player1 = await Player.findOne({ _id: player._id });

    if (player1.isSelected) {
      team.players = team.players.filter((player) => player._id.toString() !== player1._id.toString());
      player1.isSelected = false;
      await player1.save();
      await team.save();
      return res.json({ team }); 
    } else {
      return res.status(400).json({ message: "Player not selected" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } 
});

router.get("/getAllTeams", async (req, res) => {
    try {
        const teams = await Team.find();
        res.json({teams});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});
       


module.exports = router;