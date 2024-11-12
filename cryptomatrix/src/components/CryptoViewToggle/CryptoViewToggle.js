import React, { useState } from 'react';
import { GridView, List } from '@mui/icons-material';  // Import Material Icons for Grid and List views
import CryptoGrid from '../CryptoGrid/CryptoGrid';
import CryptoTable from '../CryptoTable/CryptoTable';
import { useTranslation } from 'react-i18next';

const CryptoViewToggle = () => {
  const [isGridView, setIsGridView] = useState(true); // State to toggle view

  const toggleView = () => {
    setIsGridView(!isGridView); // Toggle view when icon is clicked
  };
  const { t } = useTranslation();

  return (
    <div>
      {/* Toggle button container to show both icons */}
      <h1 style={{padding: '32px'}}>{t('Uncover')}</h1>
      <div style={styles.iconContainer}>
        <button 
          onClick={toggleView} 
          style={isGridView ? styles.activeIcon : styles.icon}
        >
          <GridView fontSize="large" />
        </button>

        <button 
          onClick={toggleView} 
          style={!isGridView ? styles.activeIcon : styles.icon}
        >
          <List fontSize="large" />
        </button>
      </div>

      {/* Render the selected view */}
      {isGridView ? <CryptoGrid /> : <CryptoTable />}
    </div>
  );
};

// Styles for buttons and icons
const styles = {
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    backgroundColor: 'lightgray',  // Light gray background for inactive icon
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '30px', // Icon size
    margin: '0 10px', // Space between the icons
  },
  activeIcon: {
    backgroundColor: '#1976d2',  // Highlight active icon
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '30px',
    margin: '0 10px',
    color: 'white',  // White color for active icon
  },
};

export default CryptoViewToggle;
