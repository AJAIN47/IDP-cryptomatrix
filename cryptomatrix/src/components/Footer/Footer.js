import React, { } from 'react';
import './Footer.css';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';

// Footer component creation
const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <div className="footer-logo">
                        <img src={logo} alt="CryptoMatrix Logo" height="40"/>
                    </div>
                </div>
                <div className="footer-column">
                    <h5>{t('Support')}</h5>
                    <p>{t('1-800-123-4567')}</p>
                    <p>{t('help@email.com')}</p>
                </div>
                <div className="footer-column">
                    <h5>{t('Company')}</h5>
                    <p>{t('About Us')}</p>
                    <p>{t('Employment')}</p>
                </div>
                <div className="footer-column">
                    <h5>{t('Community')}</h5>
                    <p><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">{t('Facebook')}</a></p>
                    <p><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">{t('Twitter')}</a></p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;