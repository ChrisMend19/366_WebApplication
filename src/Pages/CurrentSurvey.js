import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import Login from './Login.js'
import Survey1Qs from '../Data/Survey1Questions.json'
import Axios from 'axios';

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

  const [postList,setPostList] = useState([]);

  async function getSurveyQuestions(){
    try {
      const str = "http://localhost:4000/ShowSurveys/".concat(CurrentSurvey)
      const surveys = Axios.get(str)
      return (await surveys).data;
    } catch (err){
      console.log(err);
    }
  }
  
  useEffect(() => {getSurveyQuestions().then( result => {
    if (result){
      setPostList(result);
      console.log(result);
    }});
  }, []);

  function ShowSurveyQuestions(props){
    const rows = props.surveys.map((row) => {
      return(
        <tr key={row.Survey, row.question}>
          <td>{row.QuestionId}</td>
          <td>{row.question}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    )};

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <button id="Edit" type="button" onClick={toEditCurrentSurvey}>Edit</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h2>Survey Questions</h2>
        <div class="tContainer">
        <table class="SurveyQsTable">
          <tbody> 
            <ShowSurveyQuestions surveys={postList}/>
          </tbody>
        </table>
        </div>
    </div>
  );
}


export default CurrentSurvey;
