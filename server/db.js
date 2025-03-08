const mongoose = require('mongoose');


const mongoURL = 'mongodb+srv://pclokuhewa:RlhjuKEBotFw5qze@cluster0.tbo6y.mongodb.net/Spirit11'; 


mongoose.connect(mongoURL)

const connection = mongoose.connection;

connection.on('error', ()=>{console.log('Error connecting to database')})
connection.on('connected', ()=>{console.log('MongoDB connected successfully')})

module.exports = mongoose;