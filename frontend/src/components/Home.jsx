import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="hero-section">
        <video autoPlay muted loop className="background-video">
          <source src="/videos/Tech1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <div className="title">IMAGE</div>
          <div className="topic">CLASSIFIER</div>
          <div className="des">Welcome to our image classifier app! Developed by Brendan Govic Mozo and Hans Stephen Lumasang, 
          easily identify three different objects based on their distinct features for seamless recognition in any situation.</div>
          
          <div className="buttons">
          <Link to="/predict" className="link">
              <button className='button'>START</button> 
          </Link>
          </div>
        </div>
      </div>
    );
  }

export default Home;