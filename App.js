import React, { useState, useRef, useEffect } from 'react';
function App() {
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    canvas.style.width = `${window.innerWidth * 0.8}px`;
    canvas.style.height = `${window.innerHeight * 0.8}px`;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.strokeStyle = isErasing ? '#f9f9f9' : color; // Canvas background color
    contextRef.current.stroke();
  };
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Digital Art Canvas</h1>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        ref={canvasRef}
        style={styles.canvas}
      />
       <div style={styles.toolsContainer}>
        <div style={styles.colorPickerContainer}>
          <label style={styles.label}>Pick a color: </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={styles.colorPicker}
            disabled={isErasing}
          />
        </div>
        <button onClick={toggleEraser} style={styles.eraserButton}>
          {isErasing ? 'Switch to Brush' : 'Eraser'}
        </button>
        <button onClick={resetCanvas} style={styles.resetButton}>
          Reset Drawing
        </button>
      </div>
    </div>
  );
}
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  canvas: {
    border: '2px solid #000',
    cursor: 'crosshair',
    backgroundColor: '#f9f9f9',
  },
  toolsContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerContainer: {
    marginRight: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '1.2rem',
  },
  colorPicker: {
    width: '50px',
    height: '30px',
    border: 'none',
  },
  eraserButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '10px',
  },
  resetButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
export default App;