import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Predict from './components/Predict';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route index element={<Home />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;