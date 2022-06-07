import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Survey1Qs from '../Data/Survey1Questions.json'

function EditCurrentSurvey() {

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
  function toCurrentSurvey(){
    navigate('/CurrentSurvey', {replace: true});
  } 

  const CurrentSurvey = localStorage.getItem("CurrentSurvey");

  // sql command: delete surveyQuestion == QuestionID and SurveyID == survey1Qs.SurveyID
  function deleteQuestion(){

  }

  // sql command: add SurveyQuestion. Insert into()
  function addQuestion(){

   }

   function editQuestion(){

   }  

    //  sql command: get all survey questions with surveyID == survey1Qs.SurveyID
    const survey1QuestionData=Survey1Qs.map(
        (survey1Qs)=>{
            return(
                <tr>
                    <td>{survey1Qs.QuestionID}</td>
                    <td>{survey1Qs.question}</td>
                    <td>{survey1Qs.profChar}</td>
                    <td><button onClick={deleteQuestion} type="button">Delete</button></td>
                    <td><button onClick={editQuestion} type="button">Edit</button></td>
                </tr>
            )
        }
    ) 

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <button id="Save" type="button" onClick={toCurrentSurvey}>Save</button>
        <button id="AddQuestion" type="button">Add Question</button>
        <h1>Edit Survey Name: {CurrentSurvey}</h1>
        <h1>Survey Questions</h1>
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


export default EditCurrentSurvey;
