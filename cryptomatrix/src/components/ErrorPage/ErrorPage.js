import React from 'react';
import './ErrorPage.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/404Image.png'; // Assuming this is the correct path to the 404 image

const ErrorPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="error-page">
            {/* Error content */}
            <div className="error-content">
                <img src={logo} alt="404 Image" className="error-logo" />
                <button className="back-button" onClick={() => navigate('/home')}>
                    {t("Back to Homepage")}
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;