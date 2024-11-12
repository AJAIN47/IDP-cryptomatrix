import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the components required for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InteractiveChart = ({ coinData }) => {
  const [chartData, setChartData] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (coinData) {
      // Simulated data for historical prices (replace with real API calls)
      const historicalPrices = {
        "1h": coinData.price * (1 + coinData.percent_change_1h / 100),
        "24h": coinData.price * (1 + coinData.percent_change_24h / 100),
        "7d": coinData.price * (1 + coinData.percent_change_7d / 100),
        "30d": coinData.price * (1 + coinData.percent_change_30d / 100),
        "60d": coinData.price * (1 + coinData.percent_change_60d / 100),
        "90d": coinData.price * (1 + coinData.percent_change_90d / 100),
      };

      const priceChangeData = [
        coinData.percent_change_1h,
        coinData.percent_change_24h,
        coinData.percent_change_7d,
        coinData.percent_change_30d,
        coinData.percent_change_60d,
        coinData.percent_change_90d,
      ];

      const priceData = [
        historicalPrices["1h"],
        historicalPrices["24h"],
        historicalPrices["7d"],
        historicalPrices["30d"],
        historicalPrices["60d"],
        historicalPrices["90d"],
      ];

      const labels = ['1 Hour', '24 Hours', '7 Days', '30 Days', '60 Days', '90 Days'];

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Price Changes (%)',
            data: priceChangeData,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: '#1E88E5',
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#FFCA28',
            yAxisID: 'percentage',
          },
          {
            label: 'Price (USD)',
            data: priceData,
            fill: false,
            borderColor: '#FF5733',
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: '#FF5733',
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#FFCA28',
            yAxisID: 'price',
          },
        ],
      });
    }
  }, [coinData]);

if (!chartData) return <p>Loading chart...</p>;

return (
  <div>
    <div className="chart-container" style={{ maxWidth: '1500px', margin: '0 auto' }}>
      {/* Price Changes Chart */}
      <h3 style={{ color: 'WHITE', textDecoration: 'UNDERLINE' }}>{t('Price Changes Over Time')}</h3>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: 'Price Changes (%)',
              data: chartData.datasets[0].data,
              fill: false,
              borderColor: '#42A5F5',
              tension: 0.1,
              pointRadius: 5,
              pointBackgroundColor: '#1E88E5',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}%`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: (value) => `${value}%`,
                color: 'white',  // Make Y-axis ticks white
              },
            },
            x: {
              ticks: {
                color: 'white',  // Make X-axis ticks white
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2,
            },
          },
        }}
      />
    </div>
    <div style={{ margin: '30px 0' }} />
    <div className="chart-container" style={{ maxWidth: '1500px', margin: '0 auto' }}>
      <h3 style={{ marginTop: '30px', color: 'WHITE', textDecoration: 'UNDERLINE' }}>{t('Actual Price Over Time (USD)')}</h3>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: 'Price (USD)',
              data: chartData.datasets[1].data,
              fill: false,
              borderColor: '#FF5733',
              tension: 0.1,
              pointRadius: 5,
              pointBackgroundColor: '#FF5733',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: (value) => `$${value}`,
                color: 'white',  // Make Y-axis ticks white
              },
            },
            x: {
              ticks: {
                color: 'white',  // Make X-axis ticks white
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2,
            },
          },
        }}
      />
    </div>
  </div>
);
};

export default InteractiveChart;
