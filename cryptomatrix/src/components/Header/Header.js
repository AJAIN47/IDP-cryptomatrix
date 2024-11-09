import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import './Header.css';
import Login from '../../components/logIn/login';
import ComingSoonPopup from '../ComingSoon/ComingSoon';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //language change function
  const changeLanguage = (language) => {
    i18n.changeLanguage(language); 
  };

  //popup open and close
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup =() => setIsPopupOpen(true);
  const closePopup =() => setIsPopupOpen(false);

  //coming soon popup open and close
  const [isComingSoonPopupOpen, setIsComingSoonPopupOpen] = useState(false);

  const openComingSoonPopup = () => setIsComingSoonPopupOpen(true);
  const closeComingSoonPopup = () => setIsComingSoonPopupOpen(false);

  return (
    <header className='header'>
      {/* First line with logo, language select, and login button */}
      <div className="navbar navbar-light bg-white shadow-sm">
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
            <button 
            className="login-button"  
            onClick={openPopup}
          >
            Log In
          </button>
          <Login isOpen={isPopupOpen} onClose={closePopup} />          
          </div>
        </div>
      </div>

      {/* Second line (Blue Ribbon) */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0073ff' }}>
        <div className="container-fluid d-flex justify-content-between">
          {/* Toggle Button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links for full-screen */}
          <div className="navbar-nav me-auto d-none d-lg-flex">
            <a className="nav-link text-white" href="/">{t('Home')}</a>
            <a className="nav-link text-white" href="/portfolio">{t('Portfolio')}</a>
            <a className="nav-link text-white" href="/learn">{t('Learn')}</a>
            <a className="nav-link text-white" href="#" onClick={openComingSoonPopup}>{t('Exchange')}</a>
            <a className="nav-link text-white" href="#" onClick={openComingSoonPopup}>{t('Chart')}</a>
          </div>

          {/* Search bar on the right (always visible) */}
          <div className="search-bar-container d-flex ms-auto">
            <input
              className="form-control rounded me-2"
              type="search"
              placeholder={t('SearchPlaceholder')}
              aria-label="Search"
            />
            <button className="btn btn-light rounded" type="submit">
              🔍
            </button>
          </div>

          {/* Dropdown Menu for Mobile */}
          <div
            className={`dropdown-menu ${menuOpen ? 'show' : ''} d-lg-none`}
            style={{
              backgroundColor: '#0073ff',
              left: '0',
              top: '50px',
              position: 'absolute',
              zIndex: '999',
            }}
          >
            <a className="dropdown-item text-white" href="/">{t('Home')}</a>
            <a className="dropdown-item text-white" href="/portfolio">{t('Portfolio')}</a>
            <a className="dropdown-item text-white" href="/learn">{t('Learn')}</a>
            <a className="dropdown-item text-white" href="#" onClick={openComingSoonPopup}>{t('Exchange')}</a>
            <a className="dropdown-item text-white" href="#" onClick={openComingSoonPopup}>{t('Chart')}</a>
          </div>
        </div>
      </nav>
      <ComingSoonPopup isOpen={isComingSoonPopupOpen} onClose={closeComingSoonPopup} />
    </header>
  );
}

export default Header;