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
  //const [surveys, setSurveys] = useState([]);
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

  function setCurrentSurvey(e){
    localStorage.setItem("CurrentSurvey", e.target.value)
    toCurrentSurvey()
  }

  function setCurrentSurvey2(e){
    localStorage.setItem("CurrentSurvey", e.target.value)
    toShowSurveys()
  }
  
  const [postList,setPostList]=useState();
  Axios.get("http://localhost:3000/:Dashboard").then(response => {
      console.log("response");
      console.log(response.data);
      setPostList(response.data)
      }).catch(e => {
        console.log(e)
  });
  /*
  async function getSurvey(){
    try{
      const result = await axios.get(`http://localhost:5000/:Dashboard`);
      return result;
    } catch (err){
      console.log(err);
    }
  }
  useEffect(async () => {
    getSurvey().then((result)=> {
      if (result) {
        setSurveys(result);ç
      }
    })
  }, []);*/
  // function printCS(){
  //   console.log(data)
  // }


  const surveyData=Survey1.map(
      (survey)=>{
          return(
              <tr>
                  <td><button className="DashboardSurveyButton" value={survey.title} onClick={setCurrentSurvey} type="button">{survey.title}</button></td>
                  <td><button className="DashboardSurveyButton"  value={survey.title} onClick={setCurrentSurvey2} type="button">Show Surveys</button></td>
                  <td><button className="DashboardSurveyButton"  type="button">Edit Survey Status</button></td>
              </tr>
          )
      }
  )

  return (
    <div className = "AdminDashboard">
    <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
    {/* <button type="button" onClick={printCS}>print</button> */}
    <h1>{saved}</h1>
    {/* <table class="tableHeader">
        <th>Survey Name</th>
    </table> */}
    <div className="tContainer">
      <table className="table">
      <tbody>
        {surveyData}
      </tbody>
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
