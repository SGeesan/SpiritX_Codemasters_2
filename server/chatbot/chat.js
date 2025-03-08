require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Store chat history for each user
const historyStore = {};
const playerdetails = [
  {
    name: "John",
    totalScore: 50,
    position: "Batsman",
    team: "Team A",
    age: 28,
    role: "Top order batsman"
  },
  {
    name: "Marlen",
    totalScore: 45,
    position: "Bowler",
    team: "Team B",
    age: 30,
    role: "Fast bowler"
  },
  {
    name: "Gabrial",
    totalScore: 75,
    position: "Allrounder",
    team: "Team C",
    age: 25,
    role: "Allrounder"
  },
  {
    name: "Sarah",
    totalScore: 40,
    position: "Wicketkeeper",
    team: "Team D",
    age: 26,
    role: "Wicketkeeper batsman"
  },
  {
    name: "Mikhael",
    totalScore: 60,
    position: "Batsman",
    team: "Team E",
    age: 27,
    role: "Middle-order batsman"
  },
  {
    name: "Raj",
    totalScore: 52,
    position: "Bowler",
    team: "Team F",
    age: 31,
    role: "Leg spinner"
  },
  {
    name: "Vikram",
    totalScore: 65,
    position: "Allrounder",
    team: "Team G",
    age: 29,
    role: "Allrounder"
  },
  {
    name: "Arjun",
    totalScore: 55,
    position: "Batsman",
    team: "Team H",
    age: 24,
    role: "Top order batsman"
  },
  {
    name: "Kiran",
    totalScore: 30,
    position: "Bowler",
    team: "Team I",
    age: 32,
    role: "Pace bowler"
  },
  {
    name: "Jasmin",
    totalScore: 48,
    position: "Wicketkeeper",
    team: "Team J",
    age: 26,
    role: "Wicketkeeper batsman"
  },
  {
    name: "Carlos",
    totalScore: 53,
    position: "Allrounder",
    team: "Team K",
    age: 30,
    role: "Allrounder"
  },
  {
    name: "Nina",
    totalScore: 67,
    position: "Batsman",
    team: "Team L",
    age: 28,
    role: "Opening batsman"
  },
  {
    name: "Sophia",
    totalScore: 72,
    position: "Bowler",
    team: "Team M",
    age: 25,
    role: "Medium pace bowler"
  },
  {
    name: "David",
    totalScore: 80,
    position: "Allrounder",
    team: "Team N",
    age: 32,
    role: "Allrounder"
  },
  {
    name: "Liam",
    totalScore: 60,
    position: "Batsman",
    team: "Team O",
    age: 29,
    role: "Middle-order batsman"
  },
  {
    name: "Oliver",
    totalScore: 49,
    position: "Bowler",
    team: "Team P",
    age: 27,
    role: "Pace bowler"
  },
  {
    name: "Emma",
    totalScore: 69,
    position: "Allrounder",
    team: "Team Q",
    age: 28,
    role: "Allrounder"
  },
  {
    name: "Lucas",
    totalScore: 57,
    position: "Batsman",
    team: "Team R",
    age: 26,
    role: "Top order batsman"
  },
  {
    name: "James",
    totalScore: 40,
    position: "Bowler",
    team: "Team S",
    age: 30,
    role: "Fast bowler"
  },
  {
    name: "Charlotte",
    totalScore: 62,
    position: "Wicketkeeper",
    team: "Team T",
    age: 24,
    role: "Wicketkeeper batsman"
  },
  {
    name: "Zara",
    totalScore: 74,
    position: "Allrounder",
    team: "Team U",
    age: 33,
    role: "Allrounder"
  }
];
;
/**
 * Initializes a new chat session for a given userID
 */
function initChat(userID) {
  const points = `
  John: 5, 
  Marlen: 7, 
  Gabrial: 10, 
  Alex: 6, 
  Sophie: 8, 
  Max: 9, 
  Olivia: 6, 
  Liam: 4, 
  Emma: 8, 
  Daniel: 7, 
  Mason: 10, 
  Isabella: 9, 
  Noah: 6, 
  Charlotte: 5, 
  Ethan: 7, 
  Amelia: 9, 
  James: 8, 
  Ava: 10, 
  William: 7, 
  Sophia: 6
`;
  historyStore[userID] = [
    {
      role: "user",
      parts: [{
        text: `System Instruction: You are a model(Spiriter) who knows some details about the cricket players in Spirit11 fantasy Cricket tournament and\
      you are to provide support to the user to find the best team and to know about the players.\
      You can suggest the team(of 11) only relying on the points data
      \nThe following are the points of the players used to rank them. Don't reveal the user the points or that you use points for ordering for any reason:\n\
      ${points}`
      }]
    },
    {
      role: "model",
      parts: [{ text: "Understood!" }]
    }
  ];
}

/**
 * Sends a message to Gemini and maintains chat history for the given userID
 */
async function chatWithGemini(userID, userMessage) {
  if (!historyStore[userID]) {
    return "Error: Chat session not initialized. Call initChat(userID) first.";
  }
  const chat = model.startChat({ history: historyStore[userID] });
  //Catagorizing the question
  const result = await chat.sendMessage(`System Querry: Catagorize the following prompt\
  as (relevent to cricket rules, the tournament, team suggession or the players)[1] or not[0] and give the boolean answer\
  as either 1 or 0 and return the bit only:"${userMessage}"`);
  const valid = result.response.candidates[0].content.parts[0].text;
  if (valid == '1\n') {
    const missingDetailsPrompt = `What specific player/s details are needed to answer the following question?\n"${userMessage}"\n\
    Please respond with comma seperated list of players from the playerdetails list that are required\
    return Unknown if any required playername is not in the list
    return None if no more details are needed and don't provide any other format of responce`;
    const missingDetailsResult = await chat.sendMessage(missingDetailsPrompt);
    const missingDetails = missingDetailsResult.response.candidates[0].content.parts[0].text.trim();
    if (missingDetails == "Unknown"){
      return "I don’t have enough knowledge to answer that question."
    }
    if (missingDetails != "None")
    {try {
      console.log(missingDetails)
      playerNames = missingDetails.split(",")
      console.log("Missing player details:", playerNames); // This will be an array of names
      const details = playerdetails.filter(player => playerNames.includes(player.name));
      const result = await chat.sendMessage(`System Instruction:\
      \nThe following are the information about the players. Don't reveal the user the points for any reason:\n\
      ${JSON.stringify(details)}`)
      console.log(result.response.candidates[0].content.parts[0].text.trim())
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return "I can't understand the question.";
    }}
    const botreply = await chat.sendMessage(`${userMessage}`)
    return botreply.response.candidates[0].content.parts[0].text
  }
  else {
    return "I don’t have enough knowledge to answer that question."
  }
}

/**
 * API Endpoint - GET /chat?userID=123&message=your+question
 */
app.use(express.json()); // Middleware to parse JSON body

app.post("/chat", async (req, res) => {
  const { userID, message } = req.body;

  if (!userID || !message) {
    return res.status(400).json({ error: "Missing userID or message" });
  }

  if (!historyStore[userID]) {
    initChat(userID);
  }

  try {
    const response = await chatWithGemini(userID, message);
    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});