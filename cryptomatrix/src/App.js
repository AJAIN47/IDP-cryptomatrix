import React from 'react';
import './i18n';
import './App.css';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
    </div>
  );
}

export default App;
