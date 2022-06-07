import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import OnetJobs from './Pages/OnetJobs';
import OnetJob from './Pages/Job';
import CreateSurvey from './Pages/CreateSurvey';
import CurrentSurvey from './Pages/CurrentSurvey';
import EditCurrentSurvey from './Pages/EditCurrentSurvey';
import SurveyAnalytics from './Pages/SurveyAnalytics';
import CreateProfileChar from './Pages/CreateProfileChar';
import ShowSurveys from './Pages/ShowSurveys';
// CSS
import './Styles/App.css'

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/OnetJobs" element={<OnetJobs />} />
          <Route path="/OnetJob" element={<OnetJob />} />
          <Route path="/CreateSurvey" element={<CreateSurvey />} />
          <Route path="/CurrentSurvey" element={<CurrentSurvey />} />
          <Route path="/CreateProfileChar" element={<CreateProfileChar />} />
          <Route path="/EditCurrentSurvey" element={<EditCurrentSurvey />} />
          <Route path="/SurveyAnalytics" element={<SurveyAnalytics />} />
          <Route path="/ShowSurvey" element={<ShowSurveys />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
