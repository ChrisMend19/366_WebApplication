import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import '../Styles/ShowSurveys.css'


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
        <h1>Show Surveys</h1>
        <div className="SurveyData">
            <table class="tableSurveyData">
                <tr>Number of Survey Types: </tr>
                <tr>Survey Type: </tr>
                <tr>Number of Unique Users: </tr>
                <tr>Number of Annonymous Users: </tr>
            </table>
        </div>
        <div className="individualResponses">
                <table class="tableResponse">
                    <th>User Name / Annonymous</th>
                    <th>Date</th>
                    <th>Experience Name</th>
                    <th>Survey Status</th>
                    <th>Recommendations</th>
                    <tbody>
                        <td>Test 1</td>
                        <td>Test 1</td>
                        <td>Test 1</td>
                        <td><button type="button">Change Status</button></td>
                        <td><button type="button">View Recommendations</button></td>
                    </tbody>
                    <tbody>
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td><button type="button">Change Status</button></td>
                        <td><button type="button">View Recommendations</button></td>
                    </tbody>
                </table>
        </div>
    </div>
  );
}


export default ShowSurveys;
