import React, { useEffect, useRef, useState } from 'react';

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

const [imageCaptured, setImageCaptured] = useState(false);
const [overlayText, setOverlayText] = useState("");


  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play().catch((error) => {
            console.log('playback error', error);
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
    }
  }, []);

  
const captureImage = () => {
  if (imageCaptured) {
    setImageCaptured(false);
    setOverlayText("");
  } else {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    setImageCaptured(true);
    setOverlayText("Scanning Image...");
    setTimeout(() => {
      setOverlayText("Butterfly Detected\nMonarch\n95% Accuracy");
    }, 3000);
  }
};


  return (
    <div>
      <h1>Camera</h1>
      
<video ref={videoRef} style={{width: "100%", height: "100vh", position: "absolute", top: "0", left: "0", display: imageCaptured ? "none" : "block"}} playsInline autoPlay muted />
<canvas ref={canvasRef} style={{width: "100%", height: "100vh", position: "absolute", top: "0", left: "0", display: imageCaptured ? "block" : "none"}} />

{overlayText && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '24px',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '8px'
  }}>
    {overlayText.split("\n").map((text, index) => <div key={index}>{text}</div>)}
  </div>
)}

      
<button 
    onClick={captureImage} 
    style={{
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        position: 'fixed',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
    }}>
    📷
</button>

      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
}

export default Camera;
