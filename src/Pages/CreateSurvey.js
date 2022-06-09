import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Survey1Qs from '../Data/Survey1Questions.json'
import '../Styles/CreateSurvey.css'
import '../Styles/DashboardStyles.css'
import PopUp from './PopUp.js'
//import { Form, Input } from 'formsy-react-components';
import Axios from 'axios';

function CreateSurvey() {

  const [postList,setPostList] = useState([]);

  async function getSurvey(){
    try {
      const surveys = Axios.get("http://localhost:4000/Dashboard");
      return (await surveys).data;
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {getSurvey().then( result => {
    if (result){
      setPostList(result);
      console.log(result);
    }});
  }, []);

  function ShowSurveys(props){
    const rows = props.surveys.map((row) => {
      return(
        <tr key={row.SurveyID}>
          <td><button className="DashboardSurveyButton" value={row.SurveyID} type="button">{row.name}</button></td>
          

        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }

    
    const [SurveyName, setSurveyName] = useState("")

    const navigate = useNavigate();
    function toLogin(){
      localStorage.setItem("LoginUsername", NaN) 
      navigate('/', {replace: true});
    } 
    function openPop(){
      navigate('/CreateSurvey/Question', {replace: true});
    } 

    function toDashboard(){
      localStorage.setItem("CurrentSurvey", NaN) 
      navigate('/Dashboard', {replace: true});
    }

    function changeSurveyName(event){
      localStorage.setItem("CreateSurveyName", event.target.value)
      setSurveyName(event.target.value)
      console.log(SurveyName)
    }

    const survey1QuestionData=Survey1Qs.map(
      (survey1Qs)=>{
          return(
            <ShowSurveys surveys={postList}/>
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
        <button onClick = {openPop} >Add New Question</button>
      </div>
      <div className="SurveyQuestionTableContainer">
        <table className="table">
        <tbody>
            
        <ShowSurveys surveys={postList}/>
        </tbody>
        </table>
      </div>

    </div>

    
  );
}

export default CreateSurvey;