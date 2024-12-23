import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Portfolio from './components/Portfolio/Portfolio';
import LearnPage from './components/Learn/LearnPage';
import ProfilePage from './components/Profile/ProfilePage';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Carousel from './components/Carousel/Carousel';
import CryptoViewToggle from './components/CryptoViewToggle/CryptoViewToggle';
import CoinPage from './components/CoinPage/CoinPage'; // Import CoinPage
import ErrorPage from './components/ErrorPage/ErrorPage';
import ComingSoonPopup from './components/ComingSoon/ComingSoon';

function App() {
  const [cryptocurrencyData, setCryptocurrencyData] = useState([]);

  useEffect(() => {
    const fetchCryptocurrencyData = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/cryptocurrency');
        const data = await response.json();
        setCryptocurrencyData(data.data); // Adjust based on your API response
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptocurrencyData();
  }, []);
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header cryptocurrencies={cryptocurrencyData}/>
          <Routes>
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
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/exchange" element={<ComingSoonPopup />} />
            <Route path="/chart" element={<ComingSoonPopup />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
