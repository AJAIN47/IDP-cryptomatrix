import React from 'react';
import './Landing.css'; // Optional: Separate CSS file for styling
import { useTranslation } from 'react-i18next';

function Landing () {
  const { t } = useTranslation(); 

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h2>{t('Control')}</h2>
        <p>
        {t('Millions')}
        </p>
      </div>
      <div className="crypto-card">
        <h3>{t('Uncover')}</h3>
        
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
