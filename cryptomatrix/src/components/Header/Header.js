import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language); 
  };

  return (
    <header>
      {/* First line with logo, language select, and login button */}
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
            <button className="btn btn-primary px-4" style={{ fontSize: '1rem', borderRadius: '8px' }}>{t('Login')}</button>
          </div>
        </div>
      </nav>

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
          
         <div className="navbar-nav me-auto d-none d-lg-flex">
            <Link className="nav-link text-white" to="/">{t('Home')}</Link>
            <Link className="nav-link text-white" to="/portfolio">{t('Portfolio')}</Link>
            <Link className="nav-link text-white" to="/learn">{t('Learn')}</Link>
            <Link className="nav-link text-white" to="/exchange">{t('Exchange')}</Link>
            <Link className="nav-link text-white" to="/chart">{t('Chart')}</Link>
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
            <a className="dropdown-item text-white" href="/exchange">{t('Exchange')}</a>
            <a className="dropdown-item text-white" href="/chart">{t('Chart')}</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
