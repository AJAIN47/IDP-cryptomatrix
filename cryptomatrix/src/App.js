import React from 'react';
import './i18n';
import './App.css';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Carousel from './components/Carousel/Carousel';
import CryptoViewToggle from './components/CryptoViewToggle/CryptoViewToggle';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom'; // Import useRoutes
import CoinPage from './components/CoinPage/CoinPage'; // Import CoinPage

function AppRoutes() {
  // Define routes using useRoutes
  const routes = [
    {
      path: "/coin/:id",
      element: <CoinPage /> // Render CoinPage for /coin/:id route
    }
  ];

  // Pass routes to useRoutes hook
  return useRoutes(routes);
}

function App() {
  return (
    <Router>
      {/* Header will be displayed on all pages */}
      <Header />

      <Routes>
        {/* Main landing page components */}
        <Route 
          path="/" 
          element={
            <>
              <Landing />
              <Carousel />
              <CryptoViewToggle />
            </>
          } 
        />

        {/* Route for CoinPage - displays only when URL is /coin/:id */}
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;