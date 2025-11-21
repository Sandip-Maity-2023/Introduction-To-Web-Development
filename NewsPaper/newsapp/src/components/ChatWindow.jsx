import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 * Props:
 *  - onClose: function to close window
 *  - newsData: (optional) array of articles; used if user toggles "Include headlines"
 */
const ChatbotWindow = ({ onClose, newsData = [] }) => {
  // System instruction is stored separately for Gemini
  const SYSTEM_INSTRUCTION = "You are a helpful news assistant. Keep answers short and friendly.";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [includeHeadlines, setIncludeHeadlines] = useState(false);
  
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Init SpeechRecognition (if available)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + text : text));
    };

    rec.onend = () => {
      setListening(false);
    };

    rec.onerror = (e) => {
      console.error("SpeechRecognition error", e);
      setListening(false);
    };

    recognitionRef.current = rec;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (e) {
      console.error(e);
      setListening(false);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      return;
    }
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    synthRef.current.speak(utter);
  };

  const callGemini = async (userText) => {
  setLoading(true);

  try {
    // Build conversation history for Ollama
    const currentHistory = [
      ...messages,
      { role: "user", text: userText }
    ];

    // Add headlines context to user message
    let finalUserText = userText;

    if (includeHeadlines && Array.isArray(newsData) && newsData.length > 0) {
      const top = newsData
        .slice(0, 5)
        .map((a, i) => `${i + 1}. ${a.title}`)
        .join("\n");

      finalUserText = `${userText}\n\nRecent headlines:\n${top}`;
    }

    const ollamaMessages = currentHistory.map((m) => ({
      role: m.role,
      content:
        m.role === "user" && m.text === userText ? finalUserText : m.text,
    }));

    // Call LOCAL Ollama API
    const response = await axios.post(
      "http://localhost:11434/api/chat",
      {
        model: "llama3.1", // Change model if you installed a different one
        messages: ollamaMessages
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiText =
      response.data?.message?.content ||
      "Sorry, I couldn't generate a reply.";

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "assistant", text: aiText },
    ]);

    speakText(aiText);
  } catch (error) {
    console.error("Ollama API error:", error);
    const err = "Sorry, local AI service failed.";
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "assistant", text: err },
    ]);
    speakText(err);
  } finally {
    setLoading(false);
  }
};





  

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    
    // Clear input immediately
    setInput("");
    
    await callGemini(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    synthRef.current.cancel();
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "25px",
        bottom: "85px",
        width: "360px",
        maxWidth: "92vw",
        height: "520px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        padding: "12px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>AI Chatbot</div>
        <div style={{ display: "flex", gap: 8 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={includeHeadlines}
              onChange={(e) => setIncludeHeadlines(e.target.checked)}
            />
            Headlines
          </label>
          <button
            onClick={clearConversation}
            style={{ background: "#f2f2f2", border: "none", padding: "6px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              synthRef.current.cancel();
              onClose();
            }}
            style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18 }}
          >
            ✖
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px",
          background: "#f9f9f9",
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        {messages.length === 0 && (
            <div style={{textAlign: "center", color: "#888", marginTop: "50%", transform: "translateY(-50%)", fontSize: "0.9rem"}}>
                How can I help you today?
            </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 8, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                maxWidth: "80%",
                background: m.role === "user" ? "#0b74ff" : "#e5e5e5",
                color: m.role === "user" ? "white" : "#222",
                padding: "8px 12px",
                borderRadius: 12,
                lineHeight: 1.4,
                fontSize: "14px",
                whiteSpace: "pre-wrap"
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          title="Hold to speak"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: listening ? "#ff4d4f" : "#f0f0f0",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}
        >
          {listening ? "🛑" : "🎙️"}
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          style={{
            flex: 1,
            height: 40,
            padding: "8px",
            borderRadius: 20,
            border: "1px solid #ddd",
            resize: "none",
            outline: "none",
            fontFamily: "inherit"
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            height: 40,
            padding: "0 16px",
            borderRadius: 20,
            background: "#0b74ff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;