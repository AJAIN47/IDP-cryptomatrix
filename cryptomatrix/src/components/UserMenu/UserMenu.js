import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './UserMenu.css';
import profile from '../../assets/profile.png';


const UserMenu = () => {
    const { t } = useTranslation();
   
    useEffect(() => {
        const userMenuIcon = document.querySelector('.user-menu-icon');
        const userSideMenu = document.querySelector('.user-side-menu');
        const userMenuCloseButton = document.querySelector('.user-menu-close-button');
        const profileImage = document.querySelector('.user-profile-image');

        const toggleMenuVisibility = () => {
            if (userSideMenu) {
                userSideMenu.classList.toggle('visible');
            }
            if (profileImage) {
                profileImage.classList.toggle('visible');
            }
            if (userMenuIcon) {
                userMenuIcon.classList.toggle('menu-open'); // Toggle class to control z-index and visibility
            }
        };

        if (userMenuIcon) {
            userMenuIcon.addEventListener('click', toggleMenuVisibility);
        }
        if (userMenuCloseButton) {
            userMenuCloseButton.addEventListener('click', toggleMenuVisibility);
        }

        return () => {
            if (userMenuIcon) {
                userMenuIcon.removeEventListener('click', toggleMenuVisibility);
            }
            if (userMenuCloseButton) {
                userMenuCloseButton.removeEventListener('click', toggleMenuVisibility);
            }
        };
    }, []);

    return (
        <>
            {/* User Icon as menu trigger */}
            <div className="user-menu-icon">
                <img src={profile} alt="User Profile" />
            </div>

            {/* Side Menu */}
            <div className="user-side-menu">
                <span className="user-menu-close-button">&times;</span>
                <img src={profile} alt="User Profile" className="user-profile-image" />
                <h2>{t('Welcome back, Frodo.')}</h2>
                <a href="#profile">{t('Profile')}</a>
                <a href="#portfolio">{t('Portfolio')}</a>
                <a href="#logout" className="logout">{t('Logout')}</a>
            </div>
        </>
    );
};

export default UserMenu;