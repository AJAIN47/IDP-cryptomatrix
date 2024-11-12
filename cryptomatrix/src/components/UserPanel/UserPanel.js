import React from 'react';
import { useTranslation } from 'react-i18next';
import './UserPanel.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserPanel = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    // Check if 'name' is a string and has a length before attempting to use substring
    if (typeof name === 'string' && name.length > 0) {
      return name.substring(0, 2).toUpperCase();
    }
    else {
        //if name is a object and has a username property
        if (name && name.username) {
            return name.username.substring(0, 2).toUpperCase();
        }
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };
  //define username
    let username = '';
  //if user is string
    if (typeof user === 'string') {
         username = user;
    }
    //if user is object
    else if (user && user.username) {
         username = user.username;
    }
    const initials = getInitials(username);

  const panelClass = isOpen ? "user-panel open" : "user-panel";

  return (
    <div className={panelClass} style={{background:'#0073ff'}}>
      <div className="user-panel-header">
        <button onClick={onClose} className="close-btn">x</button>
        <div className="user-icon">{initials}</div>
        <h5>{t('Welcome back, {{username}}', { username })}</h5>
      </div>
      <div className="user-panel-nav1">
        <Link className="links" to="/profile" onClick={onClose}>{t('Profile')}</Link>
        <Link className="links" to="/portfolio" onClick={onClose}>{t('Portfolio')}</Link>
        <Link className="links" to="/" onClick={handleLogout}>{t('Logout')}</Link>
      </div>
    </div>
  );
};

export default UserPanel;
