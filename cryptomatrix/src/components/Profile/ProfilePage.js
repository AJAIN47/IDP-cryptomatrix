import React, { useState, useEffect, useMemo } from 'react';
import './ProfilePage.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext'; 

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth(); 

  // Load investments from localStorage or default to empty array
  const loadInvestmentsFromStorage = () => {
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins) {
      return JSON.parse(savedCoins);  // Parse the saved coins if available
    }
    return [];  // Return empty array if no saved coins
  };

  const [investments, setInvestments] = useState(loadInvestmentsFromStorage());

  // Save investments to localStorage whenever investments change
  useEffect(() => {
    if (investments.length > 0) {
      localStorage.setItem('coins', JSON.stringify(investments));  // Save the updated investments to localStorage
    }
  }, [investments]);

  // Define username
  let username = '';
  if (typeof user === 'string') {
    username = user;
  } else if (user && user.username) {
    username = user.username;
  }

  // Function to get initials from username
  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'DU'; // Provide fallback initials if username isn't set
  };

  const totalAmount = useMemo(() => {
    return investments.reduce((acc, coin) => acc + coin.amount, 0);
  }, [investments]);

  return (
    <div className="profile-container">
      <h1 style={{ color: 'gray' }}>{t('Profile')}</h1> 
      <div className="p-container">
          {/* User Profile Row */}
          <div className="row align-items-center col-12">
              <div className="col-md-6">
                  <div className="row">
                    <div className="col-auto">
                      <div className="user-icon d-flex justify-content-center align-items-center">
                        {getInitials(username)}
                      </div>
                    </div>
                    <div className="col" style={{ textAlign: 'left', margin: 'auto'}}>
                      <div style={{ textAlign: 'left', color: 'gray'}}>
                        <h1>{username}</h1>
                        <p>{t('Member since 2024')}</p>
                      </div>
                    </div>
                  </div>
              </div>
              {/* Payment Methods */}
              <div className="col-md-6">
                <div className="payment-methods">
                  <h2>{t('Payment Methods')}</h2>
                  <p>{username}'s {t('userCredit', { cardNumber: '**** **** **** 1234' })}</p>
                  <p>{username}'s {t('userPaypal', { email: '********@mail.com' })}</p>
                </div>
              </div> 
          </div>

          {/* Investments Row */}
          <div className="row">
            <div className="col-12">
              <div className="live-investments">
              <h2>{t('Amount')}: ${totalAmount.toFixed(2)}</h2>
                <h2>{t('Live Investments')}</h2>
                {/* Display investments from localStorage */}
                {investments.length > 0 ? (
                  investments.map(({ name, amount }) => (
                    <div key={name}>
                      {name}: ${amount.toFixed(2)}
                    </div>
                  ))
                ) : (
                  <p>No investments found.</p>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;
