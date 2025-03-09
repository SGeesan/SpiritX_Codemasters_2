const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { 
        type: String, 
        required: true, 
        unique: true,
        index: true
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    teamId: { type: String, required: false },
    
}, {timestamps: true});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;