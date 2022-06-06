import React from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import OnetJobs from './Pages/OnetJobs';
import CreateSurvey from './Pages/CreateSurvey';
import Job from './Pages/Job';
import './Styles/App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ONetJobs" element={<OnetJobs />} />
          <Route path="/Job" element={<Job />} />
          <Route path="/CreateSurvey" element={<CreateSurvey />} />
          <Route path="/CreateSurvey" element={<CreateSurvey />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
