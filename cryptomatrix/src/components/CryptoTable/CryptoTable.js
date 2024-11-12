import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './CryptoTable.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filter, setFilter] = useState("All"); // State to manage dropdown filter
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

  // Function to return the data without altering it
  const generateZigZagData = (data) => {
    return data; // Simply return the data as is
  };

  // Define custom column widths for specific columns
  const columnStyles = {
    symbol: {
      width: '60px',
      textAlign: 'center',
    },
    name: {
      width: '60px',
      textAlign: 'center',
    },
    price: {
      width: '60px',
      textAlign: 'center',
    },
    market: {
      width: '60px',
      textAlign: 'center',
    },
    supply: {
      width: '60px',
      textAlign: 'center',
    },
    trend: {
      width: '100px',
      textAlign: 'center',
    },
  };

  // Apply filter to display only the required number of items
  const filteredCryptos = filter === "All" ? cryptos 
    : filter === "Top 10" ? cryptos.slice(0, 10) 
    : cryptos.slice(0, 20);

  return (
    <div className="crypto-table-container">
      <h2>{t('Cryptocurrency Market')}</h2>

      <div className="dropdown-container">
        <label>{t('Show')}</label>
        <select className="dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">{t('All')}</option>
          <option value="Top 10">{t('Trending Top 10')}</option>
          <option value="Top 20">{t('Trending Top 20')}</option>
        </select>
      </div>

      <table className="crypto-table" style={{ width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={columnStyles.symbol}>{t('Symbol')}</th>
            <th style={columnStyles.name}>{t('Name')}</th>
            <th style={columnStyles.price}>{t('Price')}</th>
            <th style={columnStyles.market}>{t('Market Cap')}</th>
            <th style={columnStyles.supply}>{t('Supply')}</th>
            <th style={columnStyles.trend}>{t('Percentage Change')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td style={columnStyles.symbol}>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt={crypto.name} style={{ width: '30px', height: '30px' }} />
              </td>
              <td style={columnStyles.name}>
                <Link to={`/coin/${crypto.id}`} style={{ color: '#00d1b2', textDecoration: 'none' }}>
                  {crypto.name}
                </Link>
              </td>
              <td style={columnStyles.price}>${crypto.quote.USD.price.toFixed(2).toLocaleString()}</td>
              <td style={columnStyles.market}>${crypto.quote.USD.market_cap.toLocaleString()}</td>
              <td style={columnStyles.supply}>{crypto.circulating_supply.toLocaleString()}</td>
              <td style={columnStyles.trend}>
              <Line
  data={{
    labels: ["1h", "24h", "7d", "30d", "60d", "90d"], // Time periods
    datasets: [
      {
        label: 'Price Trend', // Label for the dataset
        data: [
          crypto.quote.USD.price, // Price at 1 hour
          crypto.quote.USD.price * (1 + crypto.quote.USD.percent_change_24h / 100), // Price at 24 hours
          crypto.quote.USD.price * (1 + crypto.quote.USD.percent_change_7d / 100), // Price at 7 days
          crypto.quote.USD.price * (1 + crypto.quote.USD.percent_change_30d / 100), // Price at 30 days
          crypto.quote.USD.price * (1 + crypto.quote.USD.percent_change_60d / 100), // Price at 60 days
          crypto.quote.USD.price * (1 + crypto.quote.USD.percent_change_90d / 100), // Price at 90 days
        ],
        borderColor: "rgba(54, 162, 235, 1)", // Line color
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Background color of the area under the line
        fill: true, // Fill the area under the line
        borderWidth: 2, // Line thickness
        pointRadius: 3, // Point size
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: true }, // Display x-axis
      y: { // y-axis for price
        type: 'linear',
        position: 'left',
      },
    },
    plugins: {
      legend: { display: true }, // Display legend
    },
  }}
  height={90}
  width={100}
/>



              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
