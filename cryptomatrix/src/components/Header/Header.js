import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';
import Login from '../../components/Login/Login';
import UserPanel from '../../components/UserPanel/UserPanel';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, isLoggedIn, setIsLoggedIn, setUsername, login, logout } = useAuth();
  console.log('Current user in header  ', user);  // This should log the current user object
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(); 
  const toggleMenu = () => { setMenuOpen(!menuOpen); };
  const changeLanguage = (language) => {
    if (typeof language === 'string') {
      i18n.changeLanguage(language);
    } else {
      console.error('Invalid type for language code:', typeof language);
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    const localUser = localStorage.getItem('username');
    if (localUser) {
      setIsLoggedIn(true);
      setUsername(localUser);
    }
  };

  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const toggleUserPanel = () => setIsUserPanelOpen(!isUserPanelOpen);

  const getUserInitials = () => {
    if (typeof user === 'string') {
      return user.charAt(0).toUpperCase() + user.slice(1);
    } else if (user && user.username) {
      return user.username.charAt(0).toUpperCase() + user.username.slice(1);
    }
    return 'User';
  };

  return (
    <header>
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="CryptoMatrix Logo" height="40" className="d-inline-block align-text-top" />
            <span className="ms-2">{t('CryptoMatrix')}</span>
          </a>
          <div className="d-flex align-items-center">
            <select className="form-select me-3" onChange={(e) => changeLanguage(e.target.value)} aria-label="Language select" style={{ maxWidth: '100px' }}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
              <option value="vi">Vietnamese</option>
            </select>
            {isLoggedIn ? (
              <div className="user-menu">
                <button onClick={toggleUserPanel} className="btn btn-primary px-4" style={{ fontSize: '1rem', borderRadius: '8px'}}>
                  {getUserInitials()}
                </button>
                <UserPanel
                    isOpen={isUserPanelOpen}
                    onClose={() => setIsUserPanelOpen(false)}
                    username={user ? (typeof user === 'string' ? user : user.username) : ''}
                    setIsLoggedIn={setIsLoggedIn}
                    logout={logout}
                    setIsUserPanelOpen={setIsUserPanelOpen} 
                  />
              </div>
            ) : (
              <button onClick={openPopup} className="btn btn-primary px-4" style={{ fontSize: '1rem', borderRadius: '8px' }}>{t('Login')}</button>
            )}

            <Login isOpen={isPopupOpen} onClose={closePopup} login={login} />
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0073ff' }}>
        <div className="container-fluid d-flex justify-content-between">
          <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-expanded={menuOpen ? 'true' : 'false'} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
         <div className="navbar-nav me-auto d-none d-lg-flex">
            <Link className="nav-link text-white" to="/">{t('Home')}</Link>
            <Link className="nav-link text-white" to="/portfolio">{t('Portfolio')}</Link>
            <Link className="nav-link text-white" to="/learn">{t('Learn')}</Link>
            <Link className="nav-link text-white" to="/exchange">{t('Exchange')}</Link>
            <Link className="nav-link text-white" to="/chart">{t('Chart')}</Link>
          </div>

          <div className="search-bar-container d-flex ms-auto">
            <input className="form-control rounded me-2" type="search" placeholder={t('SearchPlaceholder')} aria-label="Search" />
            <button className="btn btn-light rounded" type="submit">🔍</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
