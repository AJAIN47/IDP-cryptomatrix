import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './CryptoTable.css';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filter, setFilter] = useState("All"); // State to manage dropdown filter


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

  // Function to generate zig-zag pattern from the data
  const generateZigZagData = (data) => {
    let zigzagData = [];
    let direction = 1;  // 1 for increasing, -1 for decreasing

    // Generate zig-zag pattern by alternating the direction
    for (let i = 0; i < data.length; i++) {
      zigzagData.push(data[i] * direction);
      direction *= -1;  // Flip the direction after each step
    }
    return zigzagData;
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
      <h2>Cryptocurrency Market</h2>

      <div className="dropdown-container">
  <label>Show: </label>
  <select className="dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
    <option value="All">All</option>
    <option value="Top 10">Trending Top 10</option>
    <option value="Top 20">Trending Top 20</option>
  </select>
</div>

      <table className="crypto-table" style={{ width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={columnStyles.symbol}>Symbol</th>
            <th style={columnStyles.name}>Name</th>
            <th style={columnStyles.price}>Price</th>
            <th style={columnStyles.market}>Market Cap</th>
            <th style={columnStyles.supply}>Supply</th>
            <th style={columnStyles.trend}>Trend</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td style={columnStyles.symbol}>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt={crypto.name} style={{ width: '30px', height: '30px' }} />
              </td>
              <td style={columnStyles.name}>{crypto.name}</td>
              <td style={columnStyles.price}>${crypto.quote.USD.price.toFixed(2).toLocaleString()}</td>
              <td style={columnStyles.market}>${crypto.quote.USD.market_cap.toLocaleString()}</td>
              <td style={columnStyles.supply}>{crypto.circulating_supply.toLocaleString()}</td>
              <td style={columnStyles.trend}>
                <Line
                  data={{
                    labels: ["1h", "24h", "7d", "30d", "60d", "90d"], // Define time periods as labels
                    datasets: [{
                      label: 'Price Trend',
                      data: generateZigZagData([
                        crypto.quote.USD.percent_change_1h,
                        crypto.quote.USD.percent_change_24h,
                        crypto.quote.USD.percent_change_7d,
                        crypto.quote.USD.percent_change_30d,
                        crypto.quote.USD.percent_change_60d,
                        crypto.quote.USD.percent_change_90d,
                      ]), // Use the generated zig-zag data
                      borderColor: "rgba(255, 99, 132, 1)", // Color for the zig-zag line
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      fill: true,  // Fill the area under the line
                      borderWidth: 2,
                      pointRadius: 3,
                    }],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: { display: true },
                      y: { display: true },
                    },
                    plugins: {
                      legend: { display: false }
                    }
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