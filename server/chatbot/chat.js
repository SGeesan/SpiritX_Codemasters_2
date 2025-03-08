require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Store chat history for each user
const historyStore = {};

/**
 * Initializes a new chat session for a given userID
 */
function initChat(userID) {
  historyStore[userID] = [
    {
      role: "user",
      parts: [{ text: "System Instruction: You are a model who knows some details about the cricket players in Spirit11 fantasy Cricket tournament and\
      you are to provide support to the user to find the best team and to know about the players." }]
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
  const result = await chat.sendMessage(userMessage);
  const botResponse = result.response.candidates[0].content.parts[0];
  return botResponse;
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