import React, { useState, useRef } from 'react';
import './Predict.css';

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handlePredict = async () => {
    if (!image) {
      return;
    }
  
    const formData = new FormData();
    formData.append('my_image', image);
  
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className='wrapper'>
       <video autoPlay muted loop className="background-video">
          <source src="/videos/Tech1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <div className="upload-container">
        <div
          className="upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClickUpload}
        >
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <div className="upload-placeholder">Click or drag a photo here</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="file-input"
          />
        </div>
      </div>
      <div className="results">
        <div className="results-header">
          <button className="predict-button" onClick={handlePredict}>Predict</button>
          <h2>Results</h2>
        </div>
        <p>{prediction ? `Prediction: ${prediction}` : "Results will appear here"}</p>
      </div>
    </div>
  );
};

export default UploadPhoto;