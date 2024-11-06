import React, { useState } from 'react';
import { GridView, List } from '@mui/icons-material';  // Import Material Icons for Grid and List views
import CryptoGrid from '../CryptoGrid/CryptoGrid';
import CryptoTable from '../CryptoTable/CryptoTable';

const CryptoViewToggle = () => {
  const [isGridView, setIsGridView] = useState(false); // State to toggle view

  const toggleView = () => {
    setIsGridView(!isGridView); // Toggle view when icon is clicked
  };

  return (
    <div>
      {/* Toggle button container to show both icons */}
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
    marginBottom: '20px',  // Space between icons and content
  },
  icon: {
    backgroundColor: 'transparent',
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
