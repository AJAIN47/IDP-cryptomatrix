import React from 'react';
import './ProfilePage.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext'; 

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user} = useAuth(); 

  const [investments] = React.useState({
    Bitcoin: 3000,  // amount in dollars
    Tether: 150,
    Dogecoin: 750
  });

  // Saving to local storage
//localStorage.setItem('investments', JSON.stringify(investments));

// Loading from local storage
//const loadedInvestments = JSON.parse(localStorage.getItem('investments')) || {};


   //define username
   let username = '';
   //if user is string
   if (typeof user === 'string') {
       console.log('User is a string in UserPanel', user);
         username = user;
   }
   //if user is object
   else if (user && user.username) {
       console.log('User is an object in UserPanel', user);
         username = user.username;
   }

  // Function to get initials from username
  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'DU'; // Provide fallback initials if username isn't set
  };

  return (
    <div className="profile-container container">
      <h1 style={{color: 'gray'}}>{t('Profile')}</h1> 
      <div class="container">
          {/* User Profile Row  */}
          <div class="row align-items-center col-12">
              <div class="col-md-6">
                  <div class="row">
                    <div class="col-auto">
                      <div class="user-icon d-flex justify-content-center align-items-center">
                        {getInitials(username)}
                      </div>
                    </div>
                    <div class="col" style={{ textAlign: 'left' , margin: 'auto'}}>
                      <div style={{ textAlign: 'left', color: 'gray'}}>
                        <h1>{username}</h1>
                        <p>{t('Member since 2024')}</p>
                      </div>
                    </div>
                  </div>
               </div>
                 {/* Payment Methods  */}
                    <div class="col-md-6">
                      <div class="payment-methods">
                        <h2>{t('Payment Methods')}</h2>
                        <p>{username}'s {t('userCredit', { cardNumber: '**** **** **** 1234' })}</p>
                        <p>{username}'s {t('userPaypal', { email: '********@mail.com' })}</p>
                      </div>
                    </div> 
          </div>

         
          {/* Investments Row */}
          <div class="row">
            <div class="col-12">
              <div class="live-investments">
                <h2>{t('Live Investments')}</h2>
                {Object.entries(investments).map(([key, value]) => (
                  <div key={key}>
                    {key}: ${value}
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>

    </div>
  );
};

export default ProfilePage;
