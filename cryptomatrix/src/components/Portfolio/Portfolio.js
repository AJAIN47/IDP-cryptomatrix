import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './Portfolio.css';
import { useAuth } from '../../context/AuthContext';
import Login from '../Login/Login';
import { useLocation, useNavigate } from 'react-router-dom';

function Portfolio() {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? JSON.parse(savedCoins) : [
      { name: 'Bitcoin', amount: 3000 },
      { name: 'Ethereum', amount: 1250 },
      { name: 'Dogecoin', amount: 750 }
    ];
  });

  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [hasProcessedNewCoin, setHasProcessedNewCoin] = useState(false);

  useEffect(() => {
    // Exit early if the user isn't logged in, or there's no newCoin, or it's already processed
    if (!isLoggedIn || !location.state || !location.state.newCoin || hasProcessedNewCoin) return;

    const { newCoin } = location.state;

    // Check if the coin already exists in the state
    setCoins((prevCoins) => {
      const coinExists = prevCoins.find((coin) => coin.name === newCoin.name);

      let updatedCoins;
      if (coinExists) {
        // If the coin exists, update the amount
        updatedCoins = prevCoins.map((coin) =>
          coin.name === newCoin.name
            ? { ...coin, amount: coin.amount + newCoin.amount }
            : coin
        );
      } else {
        // If the coin doesn't exist, add it to the list
        updatedCoins = [...prevCoins, newCoin];
      }

      // Update localStorage
      localStorage.setItem('coins', JSON.stringify(updatedCoins));

      return updatedCoins;
    });

    // Mark that the new coin has been processed
    setHasProcessedNewCoin(true);

    // Clear the location state after processing it to avoid re-triggering the effect
    navigate(location.pathname, { replace: true });
  }, [isLoggedIn, location.state, hasProcessedNewCoin, navigate]);

  const totalAmount = useMemo(() => {
    return coins.reduce((acc, coin) => acc + coin.amount, 0);
  }, [coins]);

  const handleTransaction = (type) => {
    if (!isLoggedIn) {
      setMessage(t('You must be logged in to perform transactions.'));
      return;
    }
    setMessage(t(`${type} Transaction Successful`));
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleLogin = () => setShowLogin(!showLogin);

  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center">
        <h4 className="title card-title" style={{ color: 'gray' }}>{t('Log In or Sign Up to Start Building Your Portfolio Today!')}</h4><br />
        <button className="btn btn-primary" onClick={toggleLogin}>{t('Log In / SignUp')}</button>
        {showLogin && <Login isOpen={showLogin} onClose={toggleLogin} />}
      </div>
    );
  }

  let username = '';
  if (typeof user === 'string') {
    username = user.toUpperCase();
  } else if (user && user.username) {
    username = user.username.toUpperCase();
  }

  return (
    <div className="container my-5">
      <h4 className="title card-title" style={{ color: 'gray' }}>{`${username}'s `}{t('PORTFOLIO')}</h4><br />
      <div className="card shadow">
        <div className="card-body d-flex align-items-center justify-content-between" style={{ padding: '20px 80px', backgroundColor: '#d3d3d3' }}>
          <div> 
            <h2 className="h5">{t('Amount')}: ${totalAmount.toFixed(2)}</h2>
            <p className="text-success">{t('Last 7 days')}: +$250.00 (5.26%)</p>
          </div>
          <div>
            <button className="btn btn-primary btn-md ms-2" type="button" onClick={() => handleTransaction('Deposit')}>{t('DEPOSIT')}</button>
            <button className="btn btn-danger btn-md ms-2" type="button" onClick={() => handleTransaction('Withdraw')}>{t('WITHDRAW')}</button>
          </div>
        </div>
        {message && <div className="alert alert-success" role="alert">{message}</div>}
      </div>
      <br />
      <h4 className="card-title title" style={{ color: 'gray' }}>{t('YOUR INVESTMENTS')}</h4><br />
      <div className="container">
        <div className="row">
          {coins.map((coin) => (
            <div key={coin.name} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body" style={{backgroundColor: 'rgb(0, 115, 255)' , color: '#fff'}}>
                  <h5 className="card-title">{coin.name}</h5>
                  <h6 className="card-subtitle mb-2">{t('{{percentage}}% of your profile', { percentage: ((coin.amount / totalAmount) * 100).toFixed(2) })}</h6>
                  <p className="card-text">(${coin.amount.toFixed(2)} in {coin.name})</p> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
