const Player = require('../models/player.model');
const express = require('express');
const router = express.Router();

router.get('/getAllPlayers', async (req, res) => {
  try {
    const players = await Player.find();
    res.json({players});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;