import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Portfolio.css';

function Portfolio() {
  const { t } = useTranslation();
  const [coins, setCoins] = useState([]);
  const [message, setMessage] = useState('');  // State to store the flash message

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        { name: 'Bitcoin', percentage: 60, amount: 3000 },
        { name: 'Ethereum', percentage: 25, amount: 1250 },
        { name: 'Dogecoin', percentage: 15, amount: 750 }
      ];
      setCoins(response);
    };
    fetchData();
  }, []);

  const handleTransaction = (type) => {
    setMessage(t(`${type} Transaction Successful`)); // Translate the transaction type and message
    setTimeout(() => setMessage(''), 3000); // Remove the message after 3 seconds
  };

  return (
    <div className="container my-5">
      <h4 className="title card-title" style={{color: 'gray'}}>{t('PORTFOLIO')}</h4><br />
      <div className="card shadow">
        <div className="card-body d-flex align-items-center justify-content-between" style={{ padding: '20px 80px' }}>
          <div> 
            <h2 className="h5">{t('Amount')}: $5000.00</h2>
            <p className="text-success">{t('Last 7 days')}: +$250.00 (5.26%)</p>
          </div>
          <div>
            <button className="btn btn-primary btn-md" type="button" onClick={() => handleTransaction('Deposit')}>{t('DEPOSIT')}</button>
            <button className="btn btn-danger btn-md ms-2" type="button" onClick={() => handleTransaction('Withdraw')}>{t('WITHDRAW')}</button>
          </div>
        </div>
        {message && <div className="alert alert-success" role="alert">{message}</div>} {/* Display flash message if it exists */}
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
