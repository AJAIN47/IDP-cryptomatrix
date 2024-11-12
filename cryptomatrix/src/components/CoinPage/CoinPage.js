import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CoinPage.css';
import InteractiveChart from '../InteractiveChart/InteractiveChart';
import { useAuth } from '../../context/AuthContext';
import Login from '../Login/Login';
import { useTranslation } from 'react-i18next';

const CoinPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchaseValue, setPurchaseValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [userBalance, setUserBalance] = useState(200000); // Mock user balance
  const [hasProcessedNewCoin, setHasProcessedNewCoin] = useState(false); 
  const [dollarInput, setDollarInput] = useState(0);
  const [isUsdMode, setIsUsdMode] = useState(true);  // Track whether user is inputting USD or quantity
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [highLow24h, setHighLow24h] = useState({
    high: 0,
    low: 0,
  });
  const { t } = useTranslation(); 

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`http://localhost:5004/api/cryptocurrency/${id}`);
        const data = await response.json();
        const fetchedCoinData = data.data[id];
        setCoinData(data.data[id]);
        setLoading(false);
        const currentPrice = fetchedCoinData.quote.USD.price;
        const percentChange24h = fetchedCoinData.quote.USD.percent_change_24h;

        const high24h = currentPrice * (1 + percentChange24h / 100);
        const low24h = currentPrice * (1 - percentChange24h / 100);

        setHighLow24h({
          high: high24h.toFixed(2),
          low: low24h.toFixed(2),
        });
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!coinData) return <p>Coin data not found.</p>;

  const { name, symbol, quote, total_supply, circulating_supply, cmc_rank } = coinData;
  const price = quote?.USD?.price || 0;

  const handleConfirmPurchase = () => {
    if (userBalance >= purchaseValue) {
      setUserBalance(userBalance - purchaseValue);
      setShowModal(false);
      setShowSnackbar(true);
  
      // Hide the snackbar after 3 seconds
      setTimeout(() => setShowSnackbar(false), 3000);
  
      // Wait for 2 seconds before navigating
      setTimeout(() => {
        if (!hasProcessedNewCoin) {
          navigate('/portfolio', {
            state: {
              newCoin: {
                name,
                amount: purchaseValue,
                percentage: 0 // Placeholder; will be calculated in Portfolio
              }
            }
          });
          setHasProcessedNewCoin(true);
        }
      }, 2000); // Delay of 2 seconds before navigation
    } else {
      alert("Insufficient balance for this purchase.");
      setShowModal(false);
    }
  };

  const handlePurchaseChange = (e) => {
    const value = e.target.value;
    setPurchaseAmount(value);
    setPurchaseValue(value * price);
  };

  const handleDollarChange = (e) => {
    const value = parseFloat(e.target.value);
    setDollarInput(value);
    const quantityInCoins = value / price;
    setPurchaseAmount(quantityInCoins);
    setPurchaseValue(value);
  };

  const handleToggleMode = () => {
    setIsUsdMode(prevState => !prevState);
    setPurchaseAmount(0);
    setDollarInput(0);
    setPurchaseValue(0);
  };

  const handlePurchaseClick = () => {
    if (!isLoggedIn) {
      toggleLogin(); // Open login modal if not logged in
    } else {
      // Proceed with purchase logic if logged in
      setShowModal(true);
    }
  };

  const toggleLogin = () => setShowLogin(!showLogin);

  return (
    <div className="coin-page">
      <h1>{name} ({symbol})</h1>
      <p className="price">{t('Price')}: ${price.toFixed(2)}</p>

      <div className="background-card">
        <p className="metric">{t('Total Supply')}: {total_supply.toLocaleString()}</p>
        <p className="metric">{t('Circulating Supply')}: {circulating_supply.toLocaleString()}</p>
        <p className="rank">{t('Rank')}: #{cmc_rank}</p>
      </div>
      <div className="price-range-24h">
        <h2>{t('24-Hour Range')}</h2>
        <p>{t('High')}: ${highLow24h.high} <span>↑</span></p>
        <p>{t('Low')}: ${highLow24h.low} <span>↓</span></p>
      </div>
      <InteractiveChart coinData={coinData.quote.USD} />

      <div className="purchase-section">
        <h3>{t('Purchase')} {name}</h3>
        <button className="button-class" onClick={handleToggleMode}>
          {t('Switch to')} {isUsdMode ? 'Quantity' : 'USD'} {t('Mode')}
        </button>
        <br />

        {isUsdMode ? (
          <>
            <label className="label-class" htmlFor="purchaseValue">{t('Amount in USD')} : </label>
            <input
              type="number"
              id="purchaseValue"
              value={dollarInput}
              onChange={handleDollarChange}
              style={{ marginLeft: '10px', padding: '8px', width: '150px' }}
              step="any"
              className="input-class"
            />
          </>
        ) : (
          <>
            <label className="label-class" htmlFor="purchaseAmount">{t('Amount to Buy (in coins)')}: </label>
            <input
              type="number"
              id="purchaseAmount"
              value={purchaseAmount}
              onChange={handlePurchaseChange}
              style={{ marginLeft: '10px', padding: '8px', width: '150px' }}
              step="any"
              className="input-class"
            />
          </>
        )}

        <div className="divclass" style={{ marginTop: '15px' }}>
          <strong>{t('Total USD Value')}: </strong>
          <span>${purchaseValue.toFixed(2)}</span>
        </div>

        <div className="coin-container my-5 text-center">
      <button className="button-class"
        onClick={handlePurchaseClick}
        disabled={isLoggedIn && purchaseAmount <= 0}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: (!isLoggedIn || purchaseAmount) > 0 ? 'rgb(0, 115, 255)' : '#ccc',
          color: 'white',
          borderRadius: '4px',
          cursor: (!isLoggedIn || purchaseAmount) > 0 ? 'pointer' : 'not-allowed',
        }}
      >
        {isLoggedIn ? t('Purchase') : t('Login to Purchase')}
      </button>
      
      {/* Login modal */}
      {showLogin && <Login isOpen={showLogin} onClose={toggleLogin} />}
    </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-icon" onClick={() => setShowModal(false)}>&times;</span>
            <h3>{t('Are you sure you want to buy')} {symbol}?</h3>
            <div>
            <button onClick={handleConfirmPurchase} style={{ margin: '10px', padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px' }}>{t('Yes')}</button>
            <button onClick={() => setShowModal(false)} style={{ margin: '10px', padding: '8px 16px', backgroundColor: '#f44336', color: 'white', borderRadius: '4px' }}>{t('No')}</button>
          </div>
          </div>
        </div>
      )}

      {showSnackbar && (
        <div className="snackbar">
          {t('Your purchase is confirmed')}.
        </div>
      )}
    </div>
  );
};

export default CoinPage;
