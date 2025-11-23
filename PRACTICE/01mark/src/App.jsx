// import React from 'react'
// import TicTacToe from './TicTacToe' 
// import ToDoList from './ToDoList'
// import Form from './Form'
//  import FullSpotifyClone from './Rupam'
//  import BinaryTreeVisualizer from '../../../dsa-visualizer/src/animations/treeAni'
// import MSTVisualizer from '../../../dsa-visualizer/src/control/mst'

// function App() {
//   return (
//     <>
//       {/* <ToDoList/> */}

//       {/* <Form/> */}
//       {/* <FullSpotifyClone/> */}
//       {/* <TicTacToe/> */}
//       {/* <BinaryTreeVisualizer/> */}
//       <MSTVisualizer/>
//     </>
//   );
// }

// export default App
// // App.jsx




/*

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHandPaper, faPlay, faStop, faMousePointer } from "@fortawesome/free-solid-svg-icons";

import * as mpHands from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import * as drawing from "@mediapipe/drawing_utils";

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [pinchThreshold, setPinchThreshold] = useState(0.05);
  const [cameraInstance, setCameraInstance] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Handle pinch detection
  const detectPinch = (landmarks) => {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const dx = thumbTip.x - indexTip.x;
    const dy = thumbTip.y - indexTip.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < pinchThreshold;
  };

  // Handle results from MediaPipe
  const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];

      // Draw landmarks if enabled
      if (showLandmarks) {
        drawing.drawConnectors(canvasCtx, landmarks, mpHands.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 2,
        });
        drawing.drawLandmarks(canvasCtx, landmarks, {
          color: "#FF0000",
          lineWidth: 1,
        });
      }

      // Map fingertip position to screen coordinates
      const indexTip = landmarks[8];
      const x = (1 - indexTip.x) * window.innerWidth; // Flip horizontally
      const y = indexTip.y * window.innerHeight;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }

      // Detect pinch click
      if (detectPinch(landmarks)) {
        const now = Date.now();
        if (now - lastClickTime < 300) {
          console.log("Double click!");
          document.elementFromPoint(x, y)?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
        } else {
          console.log("Single click!");
          document.elementFromPoint(x, y)?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
        setLastClickTime(now);
      }
    }
    canvasCtx.restore();
  };

  useEffect(() => {
    const hands = new mpHands.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    hands.onResults(onResults);

    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      setCameraInstance(camera);
    }

    return () => {
      if (cameraInstance) {
        cameraInstance.stop();
      }
    };
  }, []);

  const toggleCamera = () => {
    if (!running && cameraInstance) {
      cameraInstance.start();
      setRunning(true);
    } else if (running && cameraInstance) {
      cameraInstance.stop();
      setRunning(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", height: "100vh", overflow: "hidden" }}>
      <h1 style={{ textAlign: "center" }}>🖱 Virtual Mouse using Hand Gestures</h1>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button
          onClick={toggleCamera}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={running ? faStop : faPlay} />{" "}
          {running ? "Stop" : "Start"}
        </button>

        <button
          onClick={() => setShowLandmarks(!showLandmarks)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={showLandmarks ? faHandPaper : faCamera} />{" "}
          {showLandmarks ? "Hide Landmarks" : "Show Landmarks"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <label>
          Pinch Threshold: {pinchThreshold.toFixed(2)}
          <input
            type="range"
            min="0.01"
            max="0.2"
            step="0.01"
            value={pinchThreshold}
            onChange={(e) => setPinchThreshold(parseFloat(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          border: "1px solid black",
          display: "block",
          margin: "0 auto",
        }}
      />

      {/* Virtual cursor *}
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          background: "red",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
}

*/



import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
    
    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending
    
    // Add user question to chat history
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);
    
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
        {/* Fixed Header */}
        <header className="text-center py-4">
          <a href="https://github.com/Vishesh-Pandey/chat-ai" 
             target="_blank" 
             rel="noopener noreferrer"
             className="block">
            <h1 className="text-4xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
              Chat AI
            </h1>
          </a>
        </header>

        {/* Scrollable Chat Container - Updated className */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4 hide-scrollbar"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-blue-50 rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome to Chat AI! 👋</h2>
                <p className="text-gray-600 mb-4">
                  I'm here to help you with anything you'd like to know. You can ask me about:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">💡</span> General knowledge
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">🔧</span> Technical questions
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">📝</span> Writing assistance
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">🤔</span> Problem solving
                  </div>
                </div>
                <p className="text-gray-500 mt-6 text-sm">
                  Just type your question below and press Enter or click Send!
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'question' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
                    chat.type === 'question' 
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <ReactMarkdown className="overflow-auto hide-scrollbar">{chat.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </>
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Fixed Input Form */}
        <form onSubmit={generateAnswer} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex gap-2">
            <textarea
              required
              className="flex-1 border border-gray-300 rounded p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;