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
  const [surveyNum, setSurveyNum] = useState([]);
  const [surveyShort, setSurveyShort] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [surveyDesp, setSurveyDesp] = useState("");
  const [uniqueUser, setUniqueUser] = useState([]);
  const [anonymNum, setAnonymNum] = useState([]);
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
  async function getSurveyNum(){
    try {
      const survey = window.location.pathname.split("/")[2];
      const s = "nums";
      const responses = Axios.get(`http://localhost:4000/ShowSurveys/${survey}?stat=${s}`);
      return (await responses).data;
    } catch (err){
      console.log(err);
    }
  }
  
  async function getAnonymous(){
    try {
      const survey = window.location.pathname.split("/")[2];
      const s = "anonymous";
      const responses = Axios.get(`http://localhost:4000/ShowSurveys/${survey}?stat=${s}`);
      return (await responses).data;
    } catch (err){
      console.log(err);
    }
  }
  async function getUniqueUser(){
    try {
      const survey = window.location.pathname.split("/")[2];
      const s = "unique";
      const responses = Axios.get(`http://localhost:4000/ShowSurveys/${survey}?stat=${s}`);
      return (await responses).data;
    } catch (err){
      console.log(err);
    }
  }
  async function getResponses(){
    try {
      const survey = window.location.pathname.split("/")[2];
      const s = "responses";
      const responses = Axios.get(`http://localhost:4000/ShowSurveys/${survey}?stat=${s}`);
      return (await responses).data;
    } catch (err){
      console.log(err);
    }
  }
  useEffect(()=>{getAnonymous().then(result =>{
    if(result){
      setAnonymNum(result);
    }
  });
  }, [])
  useEffect(()=>{getSurveyNum().then(result =>{
    if(result){
      setSurveyNum(result)
    }
  });
  }, [])
  useEffect(()=>{getUniqueUser().then(result =>{
    if(result){
      setUniqueUser(result);
    }
  });
  }, [])
  useEffect(() => {getResponses().then( result => {
    if (result){
      setResponses(result);
      console.log(result[0]);
      setSurveyName(result[0].sName);
      setSurveyDesp(result[0].description);
      setSurveyShort(result[0].surveyShort);
      console.log(result[0].surveyShort);
    }});
  }, []);
  function goToRecommendation(index){
    const response = responses[index];
    toRecommendation(surveyId, response.SurvResp);
  }
  const [changeStatus, setChangeStatus] = useState("");

  function ShowResponses(props){
    const rows = props.responses.map((row, index) => {
      return(
        <tr key={row.responseId}>
          <td><button type="button" onClick={()=>goToSurveyResponses(index)}>{row.User}
          </button></td>
          <td></td>
          <td>{row.Status}</td>
          <td>
          <select onChange={(e)=>setChangeStatus(e.target.value)} id="dropdown" dataC={row.charId} value={row.val}>
                <option value="1">Waiting</option>
                <option value="2">Approved</option>
                <option value="3">Not Approved</option>
            </select>
          </td>
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
  
  function ShowData(props){
    const tot = props.num.map((row, index)=>{
      return(<tr>
        <th>Number of Survey Responses:</th>{row.total}
      </tr>)
    })
    const uniq = props.uniq.map((row, index)=>{
      return(<tr>
        <th>Number of Unique User:</th>{row.uniqueUser}
      </tr>)
    })
    const anony = props.anony.map((row, index)=>{
     return( <tr>
        <th>Number of Anonymous User:</th>{row.anonymous}
      </tr>)
    })
    return(
      <tbody>
        {tot}
        {uniq}
        {anony}
      </tbody>
    )
  }
  //nums, uniq, anonys
  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Survey Name: {surveyShort}</h1>
        <h2>Show Surveys</h2>
        <div>
          <table>
            <tr><th>Survey Full Name: </th>{surveyName}</tr>
            <tr><th>Survey Description: </th>{surveyDesp}</tr>
          <ShowData num={surveyNum}
                      uniq={uniqueUser}
                      anony={anonymNum}/>
          </table>
        </div>
        <div className="individualResponses">
          <table className="table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Survey Experience Name</th>
                <th>Status</th>
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
