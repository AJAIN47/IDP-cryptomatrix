import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './Portfolio.css';
import { useAuth } from '../../context/AuthContext';
import Login from '../Login/Login';  // Ensure this is the correct import path

function Portfolio() {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const [coins, setCoins] = useState([]);
  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);  // Controls the visibility of the Login component

  useEffect(() => {
    if (!isLoggedIn) {
      return; // Early return if not logged in
    }

    // Fetch portfolio data if logged in
    const fetchData = async () => {
      const response = [
        { name: 'Bitcoin', amount: 3000 },
        { name: 'Ethereum', amount: 1250 },
        { name: 'Dogecoin', amount: 750 }
      ];

      const total = response.reduce((acc, coin) => acc + coin.amount, 0);
      const updatedCoins = response.map(coin => ({
        ...coin,
        percentage: ((coin.amount / total) * 100).toFixed(2) // Calculate percentage
      }));

      setCoins(updatedCoins);
    };
    
    fetchData();
  }, [isLoggedIn, t]);

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

  // Handle displaying the login modal or page
  const toggleLogin = () => setShowLogin(!showLogin);

  // Display login prompt if not logged in
  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center">
        <h4 className="title card-title" style={{color: 'gray'}}>{t('Log In or Sign Up to Start Building Your Portfolio Today!')}</h4><br />
        <button className="btn btn-primary" onClick={toggleLogin}>{t('Log In / SignUp')}</button>
        {showLogin && <Login isOpen={showLogin} onClose={toggleLogin} />}
      </div>
    );
  }
   //define username
   let username = '';
   //if user is string
   if (typeof user === 'string') {
       console.log('User is a string in UserPanel', user);
         username = user.toUpperCase();
   }
   //if user is object
   else if (user && user.username) {
       console.log('User is an object in UserPanel', user);
         username = user.username.toUpperCase();
   }

  return (
    <div className="container my-5">
      <h4 className="title card-title" style={{color: 'gray'}}>{`${username}'s ` }{t('PORTFOLIO')}</h4><br />
      <div className="card shadow">
        <div className="card-body d-flex align-items-center justify-content-between" style={{ padding: '20px 80px' }}>
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
      <h4 className="card-title title" style={{color: 'gray'}}>{t('YOUR INVESTMENTS')}</h4><br />
      <div className="container">
        <div className="row">
          {coins.map((coin) => (
            <div key={coin.name} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{coin.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{t('{{percentage}}% of your profile', {percentage: coin.percentage})}</h6>
                  <p className="card-text">(${coin.amount} in {coin.name})</p> 
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
