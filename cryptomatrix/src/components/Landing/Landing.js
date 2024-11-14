import React from 'react';
import './Landing.css'; // Optional: Separate CSS file for styling
import { useTranslation } from 'react-i18next';

function Landing () {
  const { t } = useTranslation(); 

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 style={{padding: '20px'}}>{t('Control')}</h1>
        <p>
        {t('Millions')}
        </p>
      </div>
      <div className="crypto-card">
        
          <iframe
  className="embed-responsive-item rounded"
  style={{ border: '1px solid #ccc' }}
  width="100%"
  height="450"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  src="https://www.youtube.com/embed/R216XHYvspA"
  title={t('VideoTitle')}
  frameBorder="0"
  allowFullScreen
></iframe>
      </div>
    </div>
  );
};

export default Landing;
