import React from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Jobs from './Pages/Jobs';
import CreateS from './Pages/CreateS';
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/CreateSurvey" element={<CreateS />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
