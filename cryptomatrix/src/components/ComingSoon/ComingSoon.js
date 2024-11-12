import React, { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoonPopup = ({ onClose, delay = 2000 }) => {
    const popupRef = useRef(null);
    const navigate = useNavigate();
    let timer;


    // Redirect to the home page after a specified delay
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
            console.log('Redirecting to the home page');
            clearTimeout(timer);
            // onClose();
        }, delay);

        return () => clearTimeout(timer);
    }, [navigate, delay]);

    

    // Close the popup if clicked outside the popup-content class
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && event.target.className !== 'popup-content') {
                // onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);
    
    

    return (
        <div className="popup-overlay">
            <div ref={popupRef} className="popup-content">
                <h1>New feature coming soon!</h1>
                <p className="redirect-text">redirecting to the home page</p>
                <div className="loading-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPopup;