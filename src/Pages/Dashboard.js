import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Login from './Login.js'
import Survey1 from '../Data/Surveys.json'
import Jobs from './OnetJobs.js';

function Dashboard() {

  const navigate = useNavigate();

  const toOnetJobs = useCallback(() => navigate('/ONetjobs', {replace: true}), [navigate]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) // idk if it works
    navigate('/', {replace: true});
  } 
  const saved = localStorage.getItem("LoginUsername");

  function printUser(){
    console.log(surveyData)
  }

  const surveyData=Survey1.map(
      (survey)=>{
          return( 
              <tr key= {survey.title}>
                  <td> {survey.title}</td>
                  <td><button type="button">Show Surveys</button></td>
                  <td><button type="button">Edit Survey Status</button></td>
              </tr>
              
          )
      }
  )

  return (
    <div className = "AdminDashboard">
    <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
    <h1>UserName: {saved}</h1>
    {/* <table class="tableHeader">
        <th>Survey Name</th>
    </table> */}
    <div className="tContainer">
      <table className="table">
      <tbody>
        {surveyData}
      </tbody>
      </table>
    </div>

    <div className="DashboardButtons">
    <button type="button" onClick={toOnetJobs}>
      Browse ONet Jobs
    </button>
    <button type="button" onClick={toOnetJobs}>
      Create Survey
    </button>
    <button type="button" onClick={toOnetJobs}>
      Create Profile Characteristic
    </button>
    <button type="button" onClick={toOnetJobs}>
      Analytics
    </button>

    </div>
</div>
  );
}


export default Dashboard;
