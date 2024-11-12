import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import './CryptoGrid.css';
import { useTranslation } from 'react-i18next';

const CryptoGrid = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filter, setFilter] = useState("All");
  const { t } = useTranslation(); 
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
        <h2>{t('Cryptocurrency Market - Grid View')}</h2>
      <div className="dropdown-container">
        <label>{t('Show')}</label>
        <select className="dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">{t('All')}</option>
          <option value="Top 10">{t('Trending Top 10')}</option>
          <option value="Top 20">{t('Trending Top 20')}</option>
        </select>
      </div>
      <div className="crypto-grid">
        {getFilteredCryptos().map((crypto) => (
          <Link key={crypto.id} to={`/coin/${crypto.id}`} className="crypto-tile">  {/* Use Link to navigate to CoinPage */}
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
              alt={crypto.name}
              className="crypto-logo"
            />
            <div className="crypto-info">
              <h3 className="crypto-name">{crypto.name}</h3>
              <p className="crypto-price">${crypto.quote.USD.price.toFixed(2).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CryptoGrid;
