import React, { useState, useEffect } from "react";
import './CryptoGrid.css';

const CryptoGrid = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filter, setFilter] = useState("All");

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

  const getFilteredCryptos = () => {
    if (filter === "Top 10") return cryptos.slice(0, 10);
    if (filter === "Top 20") return cryptos.slice(0, 20);
    return cryptos;
  };

  return (
    <div className="crypto-grid-container">
      <div className="dropdown-container">
        <label>Show:</label>
        <select className="dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Top 10">Trending Top 10</option>
          <option value="Top 20">Trending Top 20</option>
        </select>
      </div>
      <h2>Cryptocurrency Market - Grid View</h2>
      <div className="crypto-grid">
        {getFilteredCryptos().map((crypto) => (
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
