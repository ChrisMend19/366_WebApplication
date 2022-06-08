import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/ShowSurveys.css'
import SurveyResps from '../Data/surveysResponses.json'
import Axios from 'axios';

function ShowSurveys() {

  const navigate = useNavigate();
  const surveyId = window.location.pathname.split("/")[2];
  const toRecommendation = useCallback((survey, index) => navigate(`/${survey}/Recommendation/${index}`, {replace: true}), [navigate]);
  const toSurveyResponses = useCallback((survey, index) => navigate(`/${survey}/SurveyResponses/${index}`, {replace: true}), [navigate]);
  const [responses, setResponses] = useState([]);
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
  function goToSurveyResponses(index){
    const response = responses[index];
    const survey = window.location.pathname.split("/")[2];
    toSurveyResponses(survey, response.SurvResp);
  }
  async function getResponses(){
    try {
      const survey = window.location.pathname.split("/")[2];
      const responses = Axios.get(`http://localhost:4000/ShowSurveys/${survey}`);
      return (await responses).data;
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {getResponses().then( result => {
    if (result){
      setResponses(result);
      console.log(result);
    }});
  }, []);
  function goToRecommendation(index){
    const response = responses[index];
    toRecommendation(surveyId, response.SurvResp);
  }
  
  function ShowResponses(props){
    const rows = props.responses.map((row, index) => {
      return(
        <tr key={row.SurvResp}>
          <td><button type="button" onClick={()=>goToSurveyResponses(index)}>{row.SurvResp}</button></td>
          <td>{row.User}</td>
          <td><button type="button" onClick={()=>goToRecommendation(index)}>View Recommendations</button></td>
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

  

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h2>Show Surveys</h2>
        <div className="SurveyData">
            <table className="tableSurveyData">
            <tr>Number of Survey Types: </tr>
                <tr>Survey Type: </tr>
                <tr>Number of Unique Users: </tr>
                <tr>Number of Annonymous Users: </tr>
            </table>
        </div>
        <div className="individualResponses">
          <table className="table">
            <thead>
              <tr>
                <th>Survey Response Id</th>
                <th>User ID</th>
                <th>Recommendations</th>
                </tr>
        
            </thead>
            <ShowResponses responses={responses}/>
          </table>
        </div>
    </div>
  );
}


export default ShowSurveys;
