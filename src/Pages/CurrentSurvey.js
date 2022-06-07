import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import Login from './Login.js'
import Survey1Qs from '../Data/Survey1Questions.json'

function CurrentSurvey() {

  const navigate = useNavigate();

//   const toOnetJobs = useCallback(() => navigate('/Jobs', {replace: true}), [navigate]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toDashboard(){
    localStorage.setItem("CurrentSurvey", NaN) 
    navigate('/Dashboard', {replace: true});
  }
  function toEditCurrentSurvey(){
    navigate('/EditCurrentSurvey', {replace: true});
  } 
  
  const CurrentSurvey = localStorage.getItem("CurrentSurvey");

    //  sql command: get all survey questions with surveyID = survey1Qs.SurveyID
    const survey1QuestionData=Survey1Qs.map(
        (survey1Qs)=>{
            return(
                <tr>
                    <td>{survey1Qs.QuestionID}</td>
                    <td>{survey1Qs.question}</td>
                </tr>
            )
        }
    ) 

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <button id="Edit" type="button" onClick={toEditCurrentSurvey}>Edit</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h2>Survey Questions</h2>
        <div class="tContainer">
        <table class="table">
        <tbody>
            {survey1QuestionData}
        </tbody>
        </table>
        </div>
    </div>
  );
}


export default CurrentSurvey;
