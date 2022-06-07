import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Login from './Login.js'
import Survey1 from '../Data/Surveys.json'
import Jobs from './OnetJobs.js';

function Dashboard() {

  const navigate = useNavigate();
  const toOnetJobs = useCallback(() => navigate('/OnetJobs', {replace: true}), [navigate]);
  const toSurveyAnalytics = useCallback(() => navigate('/SurveyAnalytics', {replace: true}), [navigate]);
  const toCreateSurvey = useCallback(() => navigate('/CreateSurvey', {replace: true}), [navigate]);
  const toCurrentSurvey = useCallback(() => navigate('/CurrentSurvey', {replace: true}), [navigate]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN)
    navigate('/', {replace: true});
  } 
  const saved = localStorage.getItem("LoginUsername");
  localStorage.setItem("CurrentSurvey", NaN)
  // localStorage.setItem("CurrentSurvey", "")

  function setCurrentSurvey(e){
    localStorage.setItem("CurrentSurvey", e.target.value)
    toCurrentSurvey()
  }

  // function printCS(){
  //   console.log(localStorage.getItem("CurrentSurvey"))
  // }

  const surveyData=Survey1.map(
      (survey)=>{
          return(
              <tr>
                  <td>{survey.title}</td>
                  <td><button value={survey.title} onClick={setCurrentSurvey} type="button">Show Surveys</button></td>
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
    <button type="button" onClick={toCreateSurvey}>
      Create Survey
    </button>
    <button type="button" onClick={toOnetJobs}>
      Create Profile Characteristic
    </button>
    <button type="button" onClick={toSurveyAnalytics}>
      Survey Analytics
    </button>

    </div>
</div>
  );
}


export default Dashboard;
