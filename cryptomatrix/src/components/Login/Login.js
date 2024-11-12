import React, { useRef, useState } from 'react';
import './Login.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';  

// Login component
const Login = ({ isOpen, onClose }) => {
  const { login} = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger'); // 'danger' or 'success'
  const popupRef = useRef(null);

  // Reset form on close
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
    setActiveTab('login');
    onClose();  // Call onClose prop after resetting the form
  };

  // Display message
  const displayMessage = (msg, type = 'danger') => {
    setMessage(t(msg));
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  // Login user
  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password).then(() => {
      resetForm(); // This will close the popup and clear the form
    }).catch((error) => {
      displayMessage(error, 'danger'); // Now it will show the error message if credentials are wrong
    });
  };

  // Signup user
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      displayMessage("Passwords do not match!", 'danger');
      return;
    }
    // This should ideally be handled by a backend or context function
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    displayMessage('Signup successful. Please log in.', 'success');
    setActiveTab('login');
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <button className="close-button" onClick={resetForm}>x</button>
        <div className="tab-header">
          <button style={{color: 'gray'}} className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            {t('Log In')}
          </button>
          <button style={{color: 'gray'}} className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
            {t('Sign Up')}
          </button>
        </div>
        {message && <div className={`alert alert-${messageType}`}>{message}</div>}
        {activeTab === 'login' && (
          <form className="auth-form" onSubmit={handleLogin}>
            <label style={{color: 'gray'}}>{t('Username')}:</label><br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('Enter username')} required />
            <label style={{color: 'gray'}}>{t('Password')}:</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('Enter password')} required />
            <button type="submit">{t('Log In')}</button>
            <p style={{color: 'gray'}}>{t('Don\'t have an account?')} <span style={{cursor: 'pointer', color: 'blue'}} onClick={() => setActiveTab('signup')}>{t('Sign Up')}</span></p>
          </form>
        )}
        {activeTab === 'signup' && (
          <form className="auth-form" onSubmit={handleSignup}>
            <label style={{color: 'gray'}}>{t('Username')}:</label><br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('Choose a username')} required />
            <label style={{color: 'gray'}}>{t('Password')}:</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('Choose a password')} required />
            <label style={{color: 'gray'}}>{t('Confirm Password')}:</label><br />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('Confirm password')} required />
            <button type="submit">{t('Sign Up')}</button>
            <p style={{color: 'gray'}}>{t('Already have an account?')} <span style={{cursor: 'pointer', color: 'blue'}} onClick={() => setActiveTab('login')}>{t('Log In')}</span></p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
