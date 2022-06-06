import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function Jobs() {
  const navigate = useNavigate();
  const toDashboard = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) // idk if it works
    navigate('/', {replace: true});
  } 

  const surveyData=Onet1.map(
    (survey)=>{
        return(
            <tr>
                <td>{survey.title}</td>
                <td>{survey.content}</td>
            </tr>
        )
    }
)

return (
    <div className = "Dash">
      <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
      <button id="Back" type="button" onClick={toDashboard}>Back</button>
      <h1> List of O*Net Jobs</h1>
      <table class="table">
        <th>Job Name</th>
        <th>Description</th>
      </table>
      <div class = "tContainer">
        <table class="table">
        <tbody>
          {surveyData}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobs;