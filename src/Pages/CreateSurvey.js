import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Survey1Qs from '../Data/Survey1Questions.json'
import '../Styles/CreateSurvey.css'
import '../Styles/DashboardStyles.css'

function CreateSurvey() {

    localStorage.setItem("CreateSurveyName", NaN)
    const [SurveyName, setSurveyName] = useState("")

    const navigate = useNavigate();
    function toLogin(){
      localStorage.setItem("LoginUsername", NaN) 
      navigate('/', {replace: true});
    } 

    function toDashboard(){
      localStorage.setItem("CurrentSurvey", NaN) 
      navigate('/Dashboard', {replace: true});
    }

    function changeSurveyName(event){
      localStorage.setItem("CreateSurveyName", event.target.value)
      setSurveyName(event.target.value)
    }

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
    <div>
      <div className="SurveyNameContainer"> 
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Create New Survey</h1>
        <input onChange={changeSurveyName} type="text" placeholder='Survey Name'/>
      </div>
      <div className="SurveyQuestionContainer">
        <button>Add New Question</button>
      </div>
      <div className="SurveyQuestionTableContainer">
        <table class="table">
        <tbody>
            {survey1QuestionData}
        </tbody>
        </table>
      </div>

    </div>

    
  );
}

export default CreateSurvey;