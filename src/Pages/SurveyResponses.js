import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import Survey1Qs from '../Data/Survey1Questions.json'

function SurveyResponses() {

  const navigate = useNavigate();

//   const toOnetJobs = useCallback(() => navigate('/Jobs', {replace: true}), [navigate]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toShowSurveys(){
    navigate('/ShowSurveys', {replace: true});
  }
  
  const CurrentSurvey = localStorage.getItem("CurrentSurvey");


  return (
    <div className = "SurveyResponses">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toShowSurveys}>Back</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h2>Survey Responses</h2>
        <div className="UserData">
            <h1>temp</h1>
        </div>
    </div>
    
  );
}


export default SurveyResponses;
