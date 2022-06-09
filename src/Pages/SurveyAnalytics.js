import React, {useState, useEffect, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/SurveyAnalytics.css'
import Axios from 'axios';

function SurveyAnalytics() {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);///OnetJobsChar/:id
  const [SR, setSR] = useState([]);///OnetJobsChar/:id
  const [users, setusers] = useState([]);///OnetJobsChar/:id
  const [SA, setSA] = useState([]);///OnetJobsChar/:id
  const [SU, setSU] = useState([]);///OnetJobsChar/:id
  const [Des, setDes] = useState([]);///OnetJobsChar/:id
  const [surveyData, setSData] = useState([]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toDashboard(){
    localStorage.setItem("CurrentSurvey", NaN) 
    navigate('/Dashboard', {replace: true});
  }

  async function getSurveyCnt(e){
    try{
      const jobs = Axios.get("http://localhost:4000/SurveyAnalytics");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getSurveyCnt().then( result => {
    if (result){
      setJobs(result);
    }});
  }, []);

  async function getSurveyRC(e){
    try{
      const jobs = Axios.get("http://localhost:4000/SurveyAnalyticsResp");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getSurveyRC().then( result => {
    if (result){
      setSR(result);
    }});
  }, []);

  async function getSurveyU(e){
    try{
      const jobs = Axios.get("http://localhost:4000/SurveyAnalyticsUsers");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getSurveyU().then( result => {
    if (result){
      setusers(result);
    }});
  }, []);

  async function getSurveySA(e){
    try{
      const jobs = Axios.get("http://localhost:4000/SurveyAnalyticsAnnUsers");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getSurveySA().then( result => {
    if (result){
      setSA(result);
    }});
  }, []);

  function ShowSurveySA(props){
    const rows = props.SA.map((row, index) => {
      return(
        <tr>
          <td>Number of Surveys from Annonymous: {row.cnt}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }
  async function getSurveyData(){
    try{
      const result = Axios.get("http://localhost:4000/SurveyAnalyticsSurveyData");
      return (await result).data;
    } catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{getSurveyData().then(result =>
    {
      if(result){
        setSData(result);
      }
    })}, [])
  async function getSurveySU(e){
    try{
      const jobs = Axios.get("http://localhost:4000/SurveyAnalyticsRegUsers");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getSurveySU().then( result => {
    if (result){
      setSU(result);
    }});
  }, []);

  function ShowSurveySU(props){
    const rows = props.SU.map((row, index) => {
      return(
        <tr>
          <td>Number of Surveys from Unique Users: {row.cnt}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }

  async function getSurveyDes(e){
    try{
      const jobs = Axios.get("http://localhost:4000/SurveyAnalyticsDes");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getSurveyDes().then( result => {
    if (result){
      setDes(result);
    }});
  }, []);

  function ShowSurveyDes(props){
    const rows = props.Des.map((row, index) => {
      return(
        <tr>
          <td>Number of Desired Profiles associated with Users: {row.cnt}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }

  function ShowSurveyData(props){
    const rows = props.jobs.map((row, index) => {
      return(
        <tr>
          <td>Number of Survey Types: {row.cnt}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }

  function ShowSurveyRespData(props){
    const rows = props.SR.map((row, index) => {
      return(
        <tr>
          <td>Number of Survey Responses: {row.cnt}</td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }

  function ShowSurveyUsers(props){
    const rows = props.users.map((row, index) => {
      return(
        <tr>
          <td>Number of Unique User who took survey:   {row.cnt}  </td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }
  function ShowSurveyD(props){
    const rows = props.surveyData.map((row, index)=>{
      return(
        <tr key={index}>
          <td>{row.survey}</td>
          <td>{row.total}</td>
          <td>{row.uniq}</td>
          <td>{row.totalUniq}</td>
          <td>{row.anonyTotal}</td>
        </tr>
      )
    })
    return(

      <tbody>
        {rows}
      </tbody>
    )
  }

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <h1>Survey Analytics</h1>
        <div className="overallAnalytics">
            <table class="tableAnalytics">
              <ShowSurveyData jobs={jobs}/>
              <ShowSurveyRespData SR={SR}/>
              <ShowSurveyUsers users={users}/>
              <ShowSurveySA SA={SA}/>
              <ShowSurveySU SU={SU}/>
              <ShowSurveyDes Des={Des}/>
                {/* <tr>Number of Survey Types: </tr>
                <tr>Number of Survey's Taken: </tr>
                <tr>Number of Unique Users: </tr>
                <tr>Number of Surveys from Unique Users</tr>
                <tr>Number of Surveys from Annonymous Users: </tr>
                <tr>Number of Desired Profiles associated with Users: </tr> */}
            </table>
        </div>

        <div className="individualAnalytics">
            <div className = "tContainer">
                <table className="table">
                    <th>Survey Type</th>
                    <th>Total Number of Survey Responses</th>
                    <th>Number of Unique User Responses</th>
                    <th>Total Number of Responses Taken by Unique Users</th>
                    <td>Number of Anonymous User Responses</td>
                    
                        <ShowSurveyD surveyData={surveyData}/>
                  
                    
                </table>
            </div>
        </div>

    </div>
  );
}


export default SurveyAnalytics;