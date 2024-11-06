import React from 'react';
import './i18n';
import './App.css';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import CryptoGrid from './components/CryptoGrid/CryptoGrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Carousel from './components/Carousel/Carousel';


function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
      <Carousel />
      <CryptoGrid />
    </div>
  );
}

export default App;
