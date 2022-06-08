import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/ShowSurveys.css'
import SurveyResps from '../Data/surveysResponses.json'
import Axios from 'axios';

function ShowSurveys() {

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toDashboard(){
    localStorage.setItem("CurrentSurvey", NaN) 
    navigate('/Dashboard', {replace: true});
  }
  function toShowResponses(e){
    console.log(e.target.value)
    localStorage.setItem("CurrentUserSurvey", "temp")
    // navigate('/SurveyResponses', {replace: true});
  }
  async function getQuestions(){
    try {
      const survey = window.location.pathname.split("/")[2];
      const questions = Axios.get(`http://localhost:4000/ShowSurveys/${survey}`);
      return (await questions).data;
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {getQuestions().then( result => {
    if (result){
      setQuestions(result);
      console.log(result);
    }});
  }, []);

  function ShowQuestion(props){
    const rows = props.surveys.map((row, index) => {
      return(
        <tr key={row.QuestionId}>
          <td>{row.QuestionId}</td>
          <td>{row.question}</td>
          <td>{row.profChar}</td> 
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }
  const CurrentSurvey = localStorage.getItem("CurrentSurvey");

  const SurveyResData=SurveyResps.map(
    (surveyRes)=>{
        return(
            <tr>
                <td>{surveyRes.user}</td>
                <td>{surveyRes.date}</td>
                <td>{surveyRes.experienceName}</td>
                <td><button className="ShowSurveyButton" type="button">Change Status</button></td>
                <td><button className="ShowSurveyButton" value={surveyRes.user} onClick={toShowResponses} type="button">View Responses</button></td>
            </tr>
        )
    }
)

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h2>Show Surveys</h2>
        <div className="SurveyData">
            <table class="tableSurveyData">
                <tr>Number of Survey Types: </tr>
                <tr>Survey Type: </tr>
                <tr>Number of Unique Users: </tr>
                <tr>Number of Annonymous Users: </tr>
            </table>
        </div>
        <div className="individualResponses">
          <table className="table">
            <ShowQuestion props={questions}/>
          </table>
        </div>
    </div>
  );
}


export default ShowSurveys;
