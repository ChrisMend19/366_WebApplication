import React, {useState, Component, useCallback, useEffect} from 'react';
import '../Styles/App.css';
import '../Styles/JobStyles.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
import {useNavigate} from 'react-router-dom';
import JobChars from '../Data/JobChars.json'
import Axios from 'axios';
// import Dashboard from './Dashboard'

var charVal = 5;

function OnetJob() {

  const navigate = useNavigate();
  const jobTitle = localStorage.getItem("OnetJob")
  localStorage.setItem("profVal", NaN)

  function changeVal(e){
    localStorage.setItem("profVal", e.target.value)
    console.log(localStorage.getItem("profVal"))
  }

  const [q, setQ] = useState(6);
  const IncrementItem = () => {
    if (q < 7)
      setQ(q + 1);
    }
    const DecrementItem = () => {
      if (q > 0)
        setQ(q - 1);
    }
  const toLogin = useCallback(() => navigate('/', {replace: true}), [navigate]);
  function toOnetJob(e){
    localStorage.setItem("OnetJob", NaN)
    navigate('/OnetJobs', {replace: true});
  }

  const [jobs, setJobs] = useState([]);///OnetJobsChar/:id

  async function getOnetJobsProf(){
    try{
      const jobs = Axios.get("http://localhost:4000/OnetJobsChar/".concat(`"${jobTitle}"`));
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }

  // async function ChangeStatus(i){
  //   //update status
  //   try{
  //     const survey = postList[i];
  //     await Axios.post("http://localhost:4000/Dashboard", {surveyId : survey.SurveyID, status : survey.Status});
  //   } catch(error){
  //     console.log(error);
  //   }

  async function changeOnetJobsProf(index, val){
    try{
      const job = jobs[index];
      const jobs = Axios.post("http://localhost:4000/OnetJobsChar/".concat(`"${jobTitle}"`), {charId : job.charId, val : val});
      //return (await jobs).data;
      window.location.reload();
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getOnetJobsProf().then( result => {
    if (result){
      setJobs(result);
    }});
  }, []);

  function ShowJobProfs(props){
    const rows = props.jobs.map((row, index) => {
      return(
        <tr>
          <td>{row.charId}</td>
          <td>{row.dimension} - {row.characteristic}</td>
          <td>{row.val}</td>
          <td>
          {/* onChange={()=>changeOnetJobsProf(row.Title)}> */}
            <select onChange={(e)=>changeOnetJobsProf(index, e.target.value)} id="dropdown" dataC={row.charId} value={row.val}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            </td>

        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }
  
  useEffect(() => {getOnetJobsProf().then( result => {
    if (result){
      setJobs(result);
    }});
  }, []);

  function handleSelectChange(event) {
    // console.log(x)
    console.log(event.target.value)
    // API call to change value of pc
}


  var x=0
  // const toOnetJob = useCallback(() => navigate('/OnetJobs', {replace: true}), [navigate]);
  // const saved = localStorage.getItem("jobtitle");
  const OnetJob = localStorage.getItem("OnetJob");
    return (
        <div className = "JobContainer">
          <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
          <button id="Back" type="button" onClick={toOnetJob}>Back</button>
          <h1>{OnetJob}</h1>
          <h2>Onet Job Profile Characteristics:</h2>
          <div>
          <div className="jobinfo">
          <table className ="table">
            <ShowJobProfs jobs={jobs}/>
            {/* <tr> */}
              {/* <td>Task Characteristics - Work Scheduling Autonomy</td>
              <select id="dropdown" onChange={handleSelectChange} value="x">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <td>{x}</td> */}
            {/* </tr> */}
            
            
          </table>
          </div>
          


            {/* <div className="box" >
              <table>
                <thead> Characteristics </thead>
                <p> Char1:  
                  {q}  
                <button onClick={IncrementItem}>+</button>
                <button onClick={DecrementItem}>-</button>
                </p>
              </table>
            </div> */}
          </div>
        </div>
      );
}

export default OnetJob;