import React from 'react';
import './i18n';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';*/


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
           {/* Other content of your app */}
      </div>
  </Router>
  );
}

export default App;
