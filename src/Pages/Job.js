import React, {useState, Component, useCallback} from 'react';
import '../Styles/App.css';
import './styles.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
import {useNavigate} from 'react-router-dom';
// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function Job() {
  const navigate = useNavigate();
  const clicked = (e) => {
    toLogin()
    }
  const toLogin = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);
  const toJob = useCallback(() => navigate('/Job', {replace: true}), [navigate]);
  const saved = localStorage.getItem("jobtitle");
  const job = localStorage.getItem("job");
    console.log(job)
    return (
        <div className = "Dash">
          <button type="button" onClick={toLogin}>
            Back
          </button>
          <h1> {saved} </h1>
          <div className="clearfix">
            <div className="box">
            <p>Onet Job Info</p>
            </div>
            <div className="box" >
            <p>Characteristics {job} </p>
            </div>
            
          </div>
        </div>
      );
}

export default Job;