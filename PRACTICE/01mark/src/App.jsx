// import React from 'react'
// import TicTacToe from './TicTacToe' 

// function App() {
//   return (
//     // <ToDoList/>



//     <TicTacToe/>
//   )
// }

// export default App
// App.jsx
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

      {/* Virtual cursor */}
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
