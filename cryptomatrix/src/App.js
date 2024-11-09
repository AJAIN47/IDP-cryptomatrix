import React from 'react';
import './i18n';
import './App.css';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UserMenu from './components/UserMenu/UserMenu';
import PortfolioPageLogin from './components/PortfolioPageLogin/PortfolioPageLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Components that should appear on every page */}
        <Header />
        <UserMenu />
       

        {/* Routing logic for different pages */}
        <Routes>
          <Route path="/" element={<PortfolioPageLogin />} />
          <Route path="/portfolio" element={<PortfolioPageLogin />} />
          <Route path="*" element={<ErrorPage />} /> {/* Fallback route for 404 */}
        </Routes>
    
        <Footer />
      </Router>
    </div>
  );
}

export default App;