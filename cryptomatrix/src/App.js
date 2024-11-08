import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import './App.css';
import Header from './components/Header/Header';
import Portfolio from './components/Portfolio/Portfolio';
import LearnPage from './components/Learn/LearnPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* Add more Route elements here for other paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
