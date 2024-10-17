import React. { useState} from 'react';
import Popup from 'reactjs-popup';
import './login.css';

function AuthModal({ isOpen, onClose }) {
  const[isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
  }
}


