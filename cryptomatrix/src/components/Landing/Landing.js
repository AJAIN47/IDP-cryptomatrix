import React from 'react';
import './Landing.css'; // Optional: Separate CSS file for styling
import bitcoinImage from '../../assets/bitcoin.png'; // Optional: Image file for styling

function Landing () {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h2>Take control of your financial destiny today!</h2>
        <p>
        Millions of crypto investors have trust on us, the best crypto platform.*
        </p>
      </div>
      <div className="crypto-card">
        <h3>Uncover the potential of our features to elevate your crypto trading</h3>
        
        <div className="video-link-wrapper">
          <a 
            href="https://www.youtube.com/watch?v=Z-l47UJZMoM" 
            target="_blank" 
            rel="noopener noreferrer"
            className="video-link"
          >
            Watch Video
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
