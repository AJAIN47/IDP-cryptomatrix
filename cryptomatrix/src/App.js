import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import './App.css';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  return (
    <Router>
     <AuthProvider> 
        <div className="App">
          <Header />
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
            {/* Add more Route elements here for other paths */}
          </Routes>
          <Footer />
        </div>
        </AuthProvider>
    </Router>
  );
}

export default App;
