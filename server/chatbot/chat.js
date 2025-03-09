const express = require('express');
const dbconfig = require('../db.js');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const playerRoute = require('../routes/player.route');
const teamRoute = require('../routes/team.route'); // Ensure this file exists and exports a router
const chatRoute = require('../routes/chat.route');
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

app.use('/api/players', playerRoute);
app.use('/api/teams', teamRoute);
app.use('/api/chat',chatRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});