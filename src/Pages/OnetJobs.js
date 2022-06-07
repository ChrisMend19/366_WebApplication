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

function OnetJobs() {
  const navigate = useNavigate();
  const toDashboard = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);
  const toJob = useCallback(() => navigate('/Job', {replace: true}), [navigate]);

  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) // idk if it works
    navigate('/', {replace: true});
  } 
  const clicked = (e) => {
    localStorage.setItem("job", e.target.char)
    localStorage.setItem("jobtitle", e.target.id)
    console.log(localStorage.getItem("job"))
    toJob()

    }

  const surveyData=Onet1.map(
    (survey)=>{
        return(
          <tbody key= {survey.title}>
            <tr >
                <td >  <button onClick={clicked} id = {survey.title} char = {survey.char}>
                      {survey.title}
                      </button></td>
                <td> {survey.content}</td>
            </tr>
            </tbody>
        )
    }
)

return (
    <div className = "Dash">
      <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
      <button id="Back" type="button" onClick={toDashboard}>Back</button>
      <h1> List of O*Net Jobs</h1>
      <table className ="table">
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Description</th>
          </tr>
        </thead>
      </table>
      <div className = "tContainer">
        <table className ="table">
        
          {surveyData}

        </table>
      </div>
    </div>
  );
}

export default OnetJobs;