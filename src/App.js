import React from 'react';
import Login from './Pages/Login';
// import Dashboard from './Pages/Dashboard';
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
