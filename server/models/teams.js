const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    players : [
        {
            playerId: { type: String, required: true },
            name: { type: String, required: true },
            university: { type: String, required: true },
            category: { type: String, required: true },
            totalRuns: { type: Number, required: true },
            ballsFaced: { type: Number, required: true },
            inningsPlayed: { type: Number, required: true },
            wickets: { type: Number, required: true },
            oversBowled: { type: Number, required: true },
            runsConceded: { type: Number, required: true },
        }
    ]

})

const Team= mongoose.model('Team', teamSchema);
module.exports = Team;