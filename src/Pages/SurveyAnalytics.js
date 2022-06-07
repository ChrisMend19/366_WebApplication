import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/SurveyAnalytics.css'

function SurveyAnalytics() {

  const navigate = useNavigate();

  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toDashboard(){
    localStorage.setItem("CurrentSurvey", NaN) 
    navigate('/Dashboard', {replace: true});
  }

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Survey Analytics</h1>
        <div className="overallAnalytics">
            <table class="tableAnalytics">
                <tr>Number of Survey Types: </tr>
                <tr>Number of Survey's Taken: </tr>
                <tr>Number of Unique Users: </tr>
                <tr>Number of Surveys from Unique Users</tr>
                <tr>Number of Surveys from Annonymous Users: </tr>
                <tr>Number of Desired Profiles associated with Users: </tr>
            </table>
        </div>

        <div className="individualAnalytics">
            <div class = "tContainer">
                <table class="table">
                    <th>Survey Type</th>
                    <th>Number of Survey Responses</th>
                    <th>Number of Unique Users</th>
                    <th>Number of Surveys from Unique Users</th>
                    <th>Number of Surveys from Annonymous Users</th>
                    <tbody>
                        <td>Test 1</td>
                        <td>Test 1</td>
                        <td>Test 1</td>
                        <td>Test 1</td>
                        <td>Test 1</td>
                    </tbody>
                    <tbody>
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td>Test 2</td>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  );
}


export default SurveyAnalytics;