import React, { useEffect, useState } from 'react';
import './Carousel.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
  const { t } = useTranslation(); 
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    // Calculate luminance to determine if it's dark or light
    const luminance = calculateLuminance(color);
    
    // Log to check the color and luminance
    console.log(`Generated color: ${color}, Luminance: ${luminance}`);
  
    // Return the color with a style for text color depending on luminance
    return {
      backgroundColor: color,
      color: luminance < 0.5 ? 'white' : 'black', // Dark background -> white text, Light background -> black text
    };
  };
  
  const calculateLuminance = (hex) => {
    // Remove '#' if present and convert hex values to decimal
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
  
    // Apply the luminance formula (normalized RGB values)
    const a = [r, g, b].map(function (v) {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
  
    // Calculate and return luminance using the standard formula
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const fetchCryptocurrencyData = async () => {
    try {
      const response = await fetch('http://localhost:5004/api/cryptocurrency');
      const data = await response.json();
      setCryptocurrencyData(data.data); // Adjust based on the structure of the API response
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  };

  useEffect(() => {
    fetchCryptocurrencyData();
  }, []);

  return (
    <div className="carousel-container">
  <h2>{t('BuildYourPortfolio')}</h2>
  <div className="horizontal-floating-tokens">
    {cryptocurrencyData.map((token, index) => (
      <div
        key={index}
        className="floating-token"
        style={
          generateRandomColor() // Apply random color
        }
      >
        <Link 
          to={`/coin/${token.id}`}  // Link to token's detailed page
          style={{
            textDecoration: 'none',  // Remove underline
            fontFamily: 'sans-serif',
            fontWeight: '600',
            color: 'inherit'  // Inherit color from parent
          }}
        >
          {token.name} {token.symbol ? `(${token.symbol})` : "No symbol available"}
        </Link>
      </div>
    ))}
  </div>
</div>
  
  );
};

export default Carousel;
