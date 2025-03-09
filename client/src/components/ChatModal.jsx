import { useState, useEffect, useRef } from "react";
import { api } from "../api/api";

export default function ChatModal(){
    const [messages, setMessages] = useState([
        { text: "How can I help?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false); // Track the loading state

    // Reference to chat container
    const chatContainerRef = useRef(null);

    // Hardcoded responses
    // const responses = {
    //     "hello": "Hi there! How can I assist you?",
    //     "how are you": "I'm just a bot, but I'm doing great!",
    //     "goodbye": "Goodbye! Have a nice day!",
    //     "good place for coffee": "You should try the local coffee shop nearby."
    // };

    const handleSend = async () => {
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        // Check for a predefined response
        const botRes = await api.post("/chat",{ userID: "12345" , message: input});
        const botReply = botRes.data.response
        console.log(botReply);
        setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
        setLoading(false);

        setInput("");
    };

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const initChat = async () => {
          try {
            const res = await api.post("/chat/init", { userID: "12345" }); // Change userID dynamically if needed
            console.log("Chat initialized:", res.data);
          } catch (error) {
            console.error("Error initializing chat:", error);
          }
        };
    
        initChat();
      }, []);
    
    return(
    //Main container
    <div className="w-full h-full pt-10 flex flex-col">
        {/*chat bot div */}
       <div className=" rounded-lg shadow-lg w-full h-full bg-cover bg-opacity" style={{ backgroundImage: "url(./sprinter.jpg)" }}>
        
            {/*chat bot header div*/}
            <div className="border-b-2 px-2 py-4 bg-transparent" >
                <div className="inline-flex items-center">
                   
                   <span className="ml-4 font-bold text-red-700 text-2xl" >Spiriter</span>   
                </div>
            </div>
            {/*chat bot Body div*/}
            <div ref={chatContainerRef} className=" flex-grow h-80 flex flex-col w-full px-2 mb-2 mt-2 space-y-4 bg-transparent overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <span className={`px-4 py-2 text-white rounded-lg break-words ${msg.sender === "user" ? "bg-black" : "bg-red-600"}`}
                            style={{
                                wordBreak: "break-word", // Ensures long words are broken
                                maxWidth: "50%", // Prevents message from overflowing
                            }}>
                                {msg.text}
                            </span>
                        </div>
                    ))}
              {/* Show "thinking..." when the bot is processing */}
          {loading && (
            <div className="flex justify-start">
              <span className="px-4 py-2 text-white rounded-lg bg-gray-500">
                Thinking...
              </span>
            </div>
          )}       
            </div>
            
            {/*chat bot footer div*/}
            <div className="border-t-2 flex items-center py-4 px-2 relative ">
               <div className="flex flex-wrap w-full max-w-full ">
                 <textarea
                  placeholder="Type here..."
                  className="flex-1 rounded-lg px-4 py-2 border-2 mr-2 resize-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                  style={{
                  width: "100%", // full width
                  minHeight: "36px", // initial minimum height
                  maxHeight: "100px", // maximum height before scrolling
                  overflowY: "auto",
              }}
            /> 
            </div>
                 <button
                      type="submit"
                      onClick={handleSend}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2"
                >                   
                <img src="./send.svg" alt="Send" className="w-5 h-5" />
                </button>
            </div>
       </div>
    </div>
    )
}