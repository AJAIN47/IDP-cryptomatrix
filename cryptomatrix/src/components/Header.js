import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png'; // Adjust path as needed

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <img src={logo} alt="CryptoMatrix Logo" className="logo" />
          <span className="brand">CryptoMatrix</span>
        </div>

        <div className="header-right">
          <select className="language-select">
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <button className="login-btn">Log In</button>
        </div>
      </div>

      <div className="header-bottom">
        {/* Show menu toggle button only on mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Full menu for larger screens */}
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/learn">Learn</a></li>
            <li><a href="/exchange">Exchange</a></li>
            <li><a href="/chart">Chart</a></li>
          </ul>
        </nav>

        {/* Search bar on the right */}
        <div className="search-container">
          <input type="text" placeholder="Coin, Assets, Wallets" className="search-input" />
          <button className="search-btn">🔍</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
