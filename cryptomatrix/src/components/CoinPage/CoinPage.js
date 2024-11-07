import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CoinPage.css';

const CoinPage = () => {
  const { id } = useParams();  
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`http://localhost:5004/api/cryptocurrency/${id}`);
        const data = await response.json();
        setCoinData(data.data[id]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!coinData) return <p>Coin data not found.</p>;

  const { name, symbol, quote, total_supply, circulating_supply, cmc_rank, tags } = coinData;
  const price = quote.USD.price;
  const volume24h = quote.USD.volume_24h;
  const marketCap = quote.USD.market_cap;

  return (
    <div className="coin-page">
      <h1>{name} ({symbol})</h1>
      <p className="price">Price: ${price.toFixed(2)}</p>
      
      <div className="background-card">
        <p className="metric">24h Volume: ${volume24h.toLocaleString()}</p>
        <p className="metric">Market Cap: ${marketCap.toLocaleString()}</p>
        <p className="metric">Total Supply: {total_supply.toLocaleString()}</p>
        <p className="metric">Circulating Supply: {circulating_supply.toLocaleString()}</p>
        <p className="rank">Rank: #{cmc_rank}</p>
      </div>

      <div className="tags-title">Tags:</div>
      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoinPage;
