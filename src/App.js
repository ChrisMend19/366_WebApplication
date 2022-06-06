import React from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import OnetJobs from './Pages/OnetJobs';
import CreateSurvey from './Pages/CreateSurvey';
import './Styles/App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Jobs" element={<OnetJobs />} />
          <Route path="/CreateSurvey" element={<CreateSurvey />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
