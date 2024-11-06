import React, { useEffect, useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [cryptocurrencyData, setCryptocurrencyData] = useState([]);

  // Function to generate random color
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
      <h2>Your Cryptocurrency Portfolio</h2>
      <div className="horizontal-floating-tokens">
        {cryptocurrencyData.map((token, index) => (
          <div
            key={index}
            className="floating-token"
            style={{
              backgroundColor: generateRandomColor(), // Apply random color
            }}
          >
            {token.name} {token.symbol ? `(${token.symbol})` : "No symbol available"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
