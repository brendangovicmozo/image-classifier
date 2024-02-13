import React, { useState } from 'react';
import './Predict.css';

const Predict2 = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    setError(null);
    setPrediction(null);

    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to predict.');
      }

      const data = await response.json();
      console.log('Prediction data:', data); // Log prediction data
      setPrediction(data);
    } catch (error) {
      console.error('Error predicting:', error.message); // Log prediction error
      setError('Error predicting: ' + error.message);
    }
  };

  return (
    <div className='wrapper'>
      <h1>Image Recognition and Metrics</h1>
      <div className='container'>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handlePredict}>Predict</button>
      </div>
      {error && <p>{error}</p>}
      {prediction && (
        <div>
          <p>Class: {prediction.class}</p>
          <p>Probability: {prediction.probability}</p>
          <p>Accuracy: {prediction.accuracy}</p>
          <p>Precision: {prediction.precision}</p>
          <p>Recall: {prediction.recall}</p>
          <p>F1: {prediction.f1}</p>
        </div>
      )}
    </div>
  );
};

export default Predict2;
