import React, { useState } from 'react';
import logo from '../../assets/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      {/* First line with logo, language select, and login button */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="CryptoMatrix Logo" height="40" className="d-inline-block align-text-top" />
            <span className="ms-2">CryptoMatrix</span>
          </a>
          <div className="d-flex align-items-center">
            <select className="form-select me-3" aria-label="Language select" style={{ maxWidth: '100px' }}>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
            <button className="btn btn-primary px-4" style={{ fontSize: '1rem', borderRadius: '8px' }}>Log In</button>
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

          {/* Navigation Links for full-screen */}
          <div className="navbar-nav me-auto d-none d-lg-flex">
            <a className="nav-link text-white" href="/">Home</a>
            <a className="nav-link text-white" href="/portfolio">Portfolio</a>
            <a className="nav-link text-white" href="/learn">Learn</a>
            <a className="nav-link text-white" href="/exchange">Exchange</a>
            <a className="nav-link text-white" href="/chart">Chart</a>
          </div>

          {/* Search bar on the right (always visible) */}
          <div className="search-bar-container d-flex ms-auto">
            <input
              className="form-control rounded me-2"
              type="search"
              placeholder="Coin, Assets, Wallets"
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
            <a className="dropdown-item text-white" href="/">Home</a>
            <a className="dropdown-item text-white" href="/portfolio">Portfolio</a>
            <a className="dropdown-item text-white" href="/learn">Learn</a>
            <a className="dropdown-item text-white" href="/exchange">Exchange</a>
            <a className="dropdown-item text-white" href="/chart">Chart</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
