import React, { useEffect, useRef } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoonPopup = ({ onClose, delay = 5000 }) => {
    const popupRef = useRef(null);
    const navigation = useNavigate();

    // Redirect to the home page after a specified delay
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.push('/');
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, navigation]);

    // Close the popup if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
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
