import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Survey1 from '../Data/Surveys.json'
import Jobs from './OnetJobs.js';
import Axios from 'axios';

function Dashboard() {

  const navigate = useNavigate();
  const toOnetJobs = useCallback(() => navigate('/OnetJobs', {replace: true}), [navigate]);
  const toSurveyAnalytics = useCallback(() => navigate('/SurveyAnalytics', {replace: true}), [navigate]);
  const toCreateSurvey = useCallback(() => navigate('/CreateSurvey', {replace: true}), [navigate]);
  const toCurrentSurvey = useCallback(() => navigate('/CurrentSurvey', {replace: true}), [navigate]);
  const toCreateProfileChar = useCallback(() => navigate('/CreateProfileChar', {replace: true}), [navigate]);
  const toShowSurveys = useCallback(() => navigate('/ShowSurveys', {replace: true}), [navigate]);

  function toLogin(){
    localStorage.setItem("LoginUsername", NaN)
    navigate('/', {replace: true});
  } 
  const saved = localStorage.getItem("LoginUsername");
  localStorage.setItem("CurrentSurvey", NaN)
  // localStorage.setItem("CurrentSurvey", "")

  function setCurrentSurvey(e){
    localStorage.setItem("CurrentSurvey", e.target.value)
    toCurrentSurvey()
  }

  function setCurrentSurvey2(e){
    localStorage.setItem("CurrentSurvey", e.target.value)
    toShowSurveys()
  }
  const [postList,setPostList] = useState([]);

  async function getSurvey(){
    try {
      const surveys = Axios.get("http://localhost:4000/:Dashboard");
      return (await surveys).data;
    } catch (err){
      console.log(err);
    }
  }
  useEffect(() => {getSurvey().then( result => {
    if (result){
      setPostList(result);
    }});
  }, []);

  function ShowSurveys(props){
    const rows = props.surveys.map((row) => {
      return(
        <tr key={row.SurveyID}>
          <td><button className="DashboardSurveyButton" value={row.name} onClick={setCurrentSurvey} type="button">{row.name}</button></td>
          <td><button className="DashboardSurveyButton" value={row.name} type="button" onClick={setCurrentSurvey2}>Show Surveys</button></td>
          <td><button className="DashboardSurveyButton" type="button" onClick={()=>ChangeStatus(row.SurveyID)}>Change Status</button></td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }
  function ChangeStatus(surveyId){

  }
  function goToSurvey(surveyId){}

  return (
    <div className = "AdminDashboard">
    <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
    {/* <button type="button" onClick={printCS}>print</button> */}
    <h1>{saved}</h1>
    
    <div className="tContainer">
    <table className="table">
    <thead>
      <tr>
        <th>Survey Name</th>
        <th>Show Surveys</th>
        <th>Status</th>
        </tr>
    </thead> 
        
        <ShowSurveys surveys={postList}/>
        
      </table>
      </div>
    <div className="DashboardButtons">
    <button className="DashboardButton" type="button" onClick={toOnetJobs}>
      Browse ONet Jobs
    </button>
    <button className="DashboardButton" type="button" onClick={toCreateSurvey}>
      Create Survey
    </button>
    <button className="DashboardButton" type="button" onClick={toCreateProfileChar}>
      Create Profile Characteristic
    </button>
    <button className="DashboardButton" type="button" onClick={toSurveyAnalytics}>
      Survey Analytics
    </button>

    </div>
</div>
  );
}


export default Dashboard;