import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import QRCode from "qrcode.react";

const Camera = () => {
  const webcamRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [qrLink, setQrLink] = useState("");

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setPhotoURL(imageSrc);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-photo",
        { image: imageSrc }
      );

      setQrLink(response.data.fileUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Wedding Photo Capture</h2>

      {!photoURL && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: 400, borderRadius: 10 }}
        />
      )}

      <br />

      {!photoURL && (
        <button
          onClick={capturePhoto}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Capture Photo
        </button>
      )}

      {photoURL && (
        <>
          <h3>Your Photo Preview</h3>
          <img
            src={photoURL}
            alt="Captured"
            style={{ width: 300, borderRadius: 10 }}
          />

          <br /><br />

          {qrLink && (
            <>
              <h3>Scan to Download</h3>
              <QRCode value={qrLink} size={180} />
            </>
          )}

          <br /><br />

          <button
            onClick={() => {
              setPhotoURL(null);
              setQrLink("");
            }}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "#fff",
              borderRadius: 8,
            }}
          >
            Take Another Photo
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;
