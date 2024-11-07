import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, CandlestickController, CandlestickElement, Title, Tooltip, Legend);

const CandlestickChart = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5004/api/cryptocurrency/${id}`);
        const dataA = await res.json();
        const data = dataA.data[id];
        console.log(data);

        if (data && data.quote && data.quote.USD) {
          const price = data.quote.USD.price;
          const highValues = [
            price + (price * (data.quote.USD.percent_change_1h / 100)),
            price + (price * (data.quote.USD.percent_change_24h / 100)),
            price + (price * (data.quote.USD.percent_change_7d / 100)),
            price + (price * (data.quote.USD.percent_change_30d / 100)),
            price + (price * (data.quote.USD.percent_change_60d / 100)),
            price + (price * (data.quote.USD.percent_change_90d / 100)),
          ];

          const lowValues = [
            price - (price * (data.quote.USD.percent_change_1h / 100)),
            price - (price * (data.quote.USD.percent_change_24h / 100)),
            price - (price * (data.quote.USD.percent_change_7d / 100)),
            price - (price * (data.quote.USD.percent_change_30d / 100)),
            price - (price * (data.quote.USD.percent_change_60d / 100)),
            price - (price * (data.quote.USD.percent_change_90d / 100)),
          ];

          setCoinData({ ...data, highValues, lowValues });
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const getChartData = () => {
    if (!coinData || !coinData.highValues || !coinData.lowValues) return { datasets: [] };

    const candlestickData = coinData.highValues.map((high, index) => ({
      x: index,
      o: coinData.lowValues[index],
      h: high,
      l: coinData.lowValues[index],
      c: coinData.highValues[index],
    }));

    return {
      datasets: [
        {
          label: `${coinData.name} Price (OHLC)`,
          data: candlestickData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        }
      ]
    };
  };

  const calculatePercentageChange = (type = 'low') => {
    if (!coinData || coinData.lowValues.length === 0 || coinData.highValues.length === 0) return null;
    const firstValue = type === 'low' ? coinData.lowValues[0] : coinData.highValues[0];
    const lastValue = type === 'low' ? coinData.lowValues[coinData.lowValues.length - 1] : coinData.highValues[coinData.highValues.length - 1];
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  const arrowsAndPercentages = {
    lowArrow: calculatePercentageChange('low') < 0 ? "↓" : "↑",
    highArrow: calculatePercentageChange('high') < 0 ? "↓" : "↑",
    lowPercentage: `${Math.abs(calculatePercentageChange('low')).toFixed(2)}%`,
    highPercentage: `${Math.abs(calculatePercentageChange('high')).toFixed(2)}%`,
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{coinData ? `${coinData.name} Price Chart` : "Loading..."}</h1>
      <div style={topContainerStyle}>
        <div style={leftButtonContainer}>
          <button style={buttonStyle}>Value: {coinData ? coinData.highValues[coinData.highValues.length - 1] : "Loading..."}</button>
          <button style={buttonStyle}>
            {arrowsAndPercentages.lowArrow} Low: {arrowsAndPercentages.lowPercentage}
          </button>
        </div>
        <div style={rightButtonContainer}>
          <button style={buttonStyle}>High 24h: {coinData ? Math.max(...coinData.highValues) : "Loading..."}</button>
          <button style={buttonStyle}>Low 24h: {coinData ? Math.min(...coinData.lowValues) : "Loading..."}</button>
        </div>
      </div>
      <Chart
        type="candlestick"
        data={getChartData()}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const { o, h, l, c } = context.raw;
                  return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              labels: coinData ? coinData.highValues.map((_, index) => `Day ${index + 1}`) : []
            },
            y: { ticks: { beginAtZero: false } },
          },
        }}
      />
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "5px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

const topContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const leftButtonContainer = {
  display: "flex",
  flexDirection: "column",
};

const rightButtonContainer = {
  display: "flex",
  flexDirection: "column",
};

export default CandlestickChart;
