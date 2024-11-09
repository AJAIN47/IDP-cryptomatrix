import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import UserMenu from '../../components/UserMenu/UserMenu';
import './PortfolioPageLogin.css';
import { useTranslation } from 'react-i18next';

const PortfolioPageLogin = () => {
    const { t } = useTranslation();
    return (
        <div className="portfolio-page-login">
            {/* Header */}
            

            {/* Main Content */}
            <main className="main-content">
                <h2>{t('Log In or Sign Up to Start Building Your Portfolio Today!')}</h2>
                <button className="signup-btn">{t('Sign Up')}</button>
                </main>
            </div>

            
    );
};

export default PortfolioPageLogin;