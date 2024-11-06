import React, { useState, useEffect } from "react";
import './CryptoGrid.css'; // Assuming the CSS is defined in a separate file

const CryptoGrid = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/cryptocurrency');
        const data = await response.json();
        setCryptos(data.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="crypto-grid-container">
      <h2>Cryptocurrency Market - Grid View</h2>
      <div className="crypto-grid">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-tile">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
              alt={crypto.name}
              className="crypto-logo"
            />
            <div className="crypto-info">
              <h3 className="crypto-name">{crypto.name}</h3>
              <p className="crypto-price">${crypto.quote.USD.price.toFixed(2).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoGrid;
