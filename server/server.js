const express = require('express');
const dbconfig = require('./db.js');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(express.json()); 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/players',async (req, res) => {
  try {
    const players = await dbconfig.getAllPlayers();
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/players',async(req,res)=>{
  const playerData = req.body;
  try {
    const newPlayer = await dbconfig.createPlayer(playerData);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.post('/players/:id',async(req,res)=>{

  const playerId = req.params.id;
  const playerData = req.body;
  try{
    const  updatedPlayer = await dbconfig.updatePlayer(playerId,playerData);
    if (!updatedPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }
    return res.status(200).json(updatedPlayer);
    
  }catch(error){
    console.log('error updating player:',error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.delete('/players/:id',async(req,res)=>{
  const playerId = req.params.id;
  if (!playerId) {
    return res.status(404).json({ error: "Player not found" });
  }
  try{
    const deletedPlayer = await dbconfig.deletePlayer(playerId);
    return res
      .status(200)
      .json({ message: "Player deleted successfully", player: deletedPlayer });
  }catch(error){
    console.log('error deleting the player:',error)
    throw new Error("Internal server error");
  }
})

app.get('/teams',async(req,res)=>{
  try{
    const teams = await dbconfig.getAllTeams();
    res.status(200).json(teams);
  }catch(error){
    console.log('error fetching teams:',error);
    res.status(500).json({ error: "Internal server error" });
  }
})