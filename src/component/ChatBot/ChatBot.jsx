import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ChatBot = ({ visible, username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const ruleBasedReplies = {
    hello: () => `Hello ${username}! 👋`,
    bye: () => `Goodbye ${username}! See you again.`,
    thanks: () => `You're welcome, ${username}!`,
    help: () => `Sure ${username}, I'm here to help!`,
    "what is your name": () => `I'm your AI assistant, ${username}!`,
    "how are you": () => `I'm doing great! How about you, ${username}?`,
    "what can you do": () => `I can chat with you and help you out!`,
    "who made you": () => `A cool developer like you, ${username}! 😎`,
    "tell me a joke": () =>
      `Why don’t programmers like nature? It has too many bugs.`,
    "what is react": () =>
      `React is a JavaScript library for building user interfaces.`,
  };

  const getBotReply = async (text) => {
    const cleaned = text.toLowerCase().trim();

    if (ruleBasedReplies[cleaned]) {
      return ruleBasedReplies[cleaned](username);
    } else {
      try {
        const response = await axios.post(
          " https://router.huggingface.co/sambanova/v1/chat/completions",
          {
            messages: [
              {
                role: "user",
                content: text,
              },
            ],
            model: "DeepSeek-R1",
            stream: false,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const rawReply =
          response.data.choices?.[0]?.message?.content ||
          "Sorry, I couldn't generate a reply.";

        // think tags hatao
        const cleanText = rawReply
          .replace(/<think>[\s\S]*?<\/think>/g, "")
          .trim();

        return cleanText;
      } catch (error) {
        console.error("AI Error:", error);
        return `Sorry ${username}, AI is sleeping. Try again later.`;
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMsg = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const botReplyText = await getBotReply(input);
    const botMsg = { text: botReplyText, from: "bot" };

    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: visible ? 0 : "-100%" }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-4 w-full md:w-1/2 max-w-md text-white"
    >
      <h3 className="text-xl font-bold mb-4">
        👋 Hello {username}, I’m your chatbot!
      </h3>

      <div className="h-80 overflow-y-auto bg-white/10 p-3 rounded mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.from === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded max-w-xs break-words ${
                msg.from === "user" ? "bg-cyan-500" : "bg-purple-500"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow px-3 py-2 rounded bg-white/40 text-black focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;
