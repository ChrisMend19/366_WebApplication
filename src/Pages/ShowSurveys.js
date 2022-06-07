import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import Login from './Login.js'
import Survey1Qs from '../Data/Survey1Questions.json'

function ShowSurveys() {

  const navigate = useNavigate();

  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toDashboard(){
    localStorage.setItem("CurrentSurvey", NaN) 
    navigate('/Dashboard', {replace: true});
  }

  const CurrentSurvey = localStorage.getItem("CurrentSurvey");

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h1>Survey Questions</h1>
    </div>
  );
}


export default ShowSurveys;
