import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import Axios from 'axios';

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
  const survey = window.location.pathname.split("/")[1];
  const response = window.location.pathname.split("/")[3];
  const [qResponses, setQResponses] = useState([]);
  async function getQResponses(){
        try {
            const survey = window.location.pathname.split("/")[1];
            const response = window.location.pathname.split("/")[3];
            const responses = Axios.get(`http://localhost:4000/${survey}/SurveyResponses/${response}`);
            return (await responses).data;
        } catch (err){
            console.log(err);
        }
      }
    
  useEffect(() => {getQResponses().then( result => {
      if (result){
        setQResponses(result);
        console.log(result);
      }});
  }, []);
  function ShowQResponses(props){
    const rows = props.responses.map((row, index) => {
      return(
        <tr key={row.QuestionNo, row.SurvResp}>
          <td>{row.QuestionNo}</td>
          <td>{row.QValue}</td>
          <td>{row.TextPrompt}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
}

  return (
    <div className = "SurveyResponses">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toShowSurveys}>Back</button>
        <h1>Survey Name: {CurrentSurvey}</h1>
        <h2>Survey Responses</h2>
        <div className="UserData">
            <h1>Question Responses to Survey {survey} Response ID : {response}</h1>
        </div>
        <table className="table">
                <thead>
                    <td>Question Number</td>
                    <td>Choice</td>
                    <td>Answer</td>
                </thead>
                <ShowQResponses responses={qResponses}/>
              </table>
    </div>
    
  );
}


export default SurveyResponses;
