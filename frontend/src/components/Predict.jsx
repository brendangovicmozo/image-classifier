import React, { useState, useRef } from 'react';
import './Predict.css';

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
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

  return (
    <div className='wrapper'>
    <div className="upload-container">
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        {image ? (
          <img src={image} alt="Uploaded" className="uploaded-image"  />
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
      <video autoPlay muted loop className="background-video">
          <source src="/videos/Tech1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <div className="results">
        {/* Placeholder for showing results */}
        <h2>Results</h2>
        <p>Results will appear here</p>
      </div>
    </div>
  );
};

export default UploadPhoto;
