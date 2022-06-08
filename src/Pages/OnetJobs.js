import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
import Axios from 'axios';


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function OnetJobs() {
  const navigate = useNavigate();
  const toDashboard = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);
  const toJob = useCallback(() => navigate('/OnetJob', {replace: true}), [navigate]);

  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) // idk if it works
    navigate('/', {replace: true});
  } 
  const clicked = (e) => {
    localStorage.setItem("job", e.target.char)
    localStorage.setItem("jobtitle", e.target.id)
    toJob()
  }

  async function getOnetJobs(){
    try{
      await Axios.get("http://localhost:4000/OnetJobs");
    } catch(error){
      console.log(error);
    }
  }

  const surveyData=Onet1.map(
    (survey)=>{
        return(
            <tbody className="OnetJobs" key= {survey.title}>
              <tr>
                  <td id="OnetJobButton"><button onClick={clicked} id = {survey.title} char = {survey.char}>{survey.title}</button></td>
                  <td id="OnetJobDesc"> {survey.content}</td>
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
      <div className = "OnetJobsTable">
        <table className ="table2">
        
          {surveyData}

        </table>
      </div>
    </div>
  );
}

export default OnetJobs;