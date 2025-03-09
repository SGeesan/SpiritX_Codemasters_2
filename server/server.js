const express = require('express');
const dbconfig = require('./db.js');
const cors = require('cors');
const playerRoute = require('./routes/player.route');
const teamRoute = require('./routes/team.route'); 
const userRoute = require('./routes/user.route');
const chatRoute = require('./routes/chat.route') 
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;


app.use(express.json()); 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/players', playerRoute);
app.use('/api/teams', teamRoute);
app.use('/api/users', userRoute);
app.use('/api/chat',chatRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


