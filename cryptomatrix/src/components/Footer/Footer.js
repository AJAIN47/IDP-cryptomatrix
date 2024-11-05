import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Footer component creation
const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src="path-to-your-logo-image.png" alt="Logo" />
                </div>
                <div className="footer-section">
                    <h5>{t('support')}</h5>
                    <p>{t('supportText1')}</p>
                    <p>{t('supportText2')}</p>
                </div>
                <div className="footer-section">
                    <h5>{t('company')}</h5>
                    <p>{t('companyText1')}</p>
                    <p>{t('companyText2')}</p>
                </div>
                <div className="footer-section">
                    <h5>{t('community')}</h5>
                    <p><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">{t('facebook')}</a></p>
                    <p><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">{t('twitter')}</a></p>

                </div>
            </div>
        </footer>
    );
};
export default Footer;