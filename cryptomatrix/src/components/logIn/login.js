import React, { useEffect, useState, useRef } from 'react';
import './login.css';

const AuthPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const popupRef = useRef(null)

  //reset form function
  const resetForm = () => {
    setUsername('');
    setPassword("");
    setConfirmPassword('');
    setMessage('');
    setActiveTab('login');
  } 

  //reset form when close
  useEffect(() =>{
    if(!isOpen){
      resetForm();
    }
  }, [isOpen] )

  //close the popup when clicked outside
  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
      resetForm();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  //handle login function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log('Logging in...');
      console.log('Logged in successfully');
      onClose();
    } catch (error) {
      setMessage('Invalid username or password');
    }
  };

  //handle signup function
  const handleSignup = async (e) => {
    e.preventDefault();

    //check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      console.log(message);
      return;
    }

    try {
      console.log('Signing up...');
      console.log('Signed up successfully');
      
      onClose();
    } catch (error) {
      setMessage('Username already exists');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="tab-header">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
          <button 
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? (
          <LoginForm 
            setActiveTab={setActiveTab} 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            handleLogin={handleLogin} 
          />
        ) : (
          <SignUpForm 
            setActiveTab={setActiveTab} 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            confirmPassword={confirmPassword} 
            setConfirmPassword={setConfirmPassword} 
            handleSignup={handleSignup} 
          />
        )}
      </div>
    </div>
  );
};

const LoginForm = ({ setActiveTab, username, setUsername, password, setPassword, handleLogin }) => (
  <form className="auth-form" onSubmit={handleLogin}>
    <label>Username:</label><br></br>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" /><br></br>
    <label>Password:</label><br></br>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" /><br></br>
    <button type="submit">Log In</button>
    <button type="button" className="google-login">Log in with Google</button>
    <p>Don’t have an account? <span className="switch-tab" onClick={() => setActiveTab('signup')}>Sign up</span></p>
  </form>
);

const SignUpForm = ({ setActiveTab, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, handleSignup }) => (
  <form className="auth-form" onSubmit={handleSignup}>
    <label>Username:</label><br></br>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" /><br></br>
    <label>Password:</label><br></br>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" /><br></br>
    <label>Confirm password:</label><br></br>
    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" /><br></br>
    <button type="submit">Sign Up</button>
    <button type="button" className="google-signup">Sign up with Google</button>
    <p>Already have an account? <span className="switch-tab" onClick={() => setActiveTab('login')}>Log in</span></p>
  </form>
);

export default AuthPopup;
