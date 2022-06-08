import React, {useState, useEffect, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
import Axios from 'axios';


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function OnetJobs() {
  const navigate = useNavigate();
  const toDashboard = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);

  const [jobs, setJobs] = useState([]);
  function toLogin(){
    localStorage.setItem("LoginUsername", NaN)
    navigate('/', {replace: true});
  } 
  // const clicked = (e) => {
  //   localStorage.setItem("job", e.target.char)
  //   localStorage.setItem("jobtitle", e.target.id)
  //   toOnetJob()
  // }

  async function getOnetJobs(){
    try{
      const jobs = Axios.get("http://localhost:4000/OnetJobs");
      return (await jobs).data;
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {getOnetJobs().then( result => {
    if (result){
      setJobs(result);
      console.log(result)
    }});
  }, []);

  function ShowJobs(props){
    const rows = props.jobs.map((row, index) => {
      return(
        <tr key={row.Title}>
          <td><button className="Jobtitle" onClick={toOnetJob} value={row.Title}>{row.Title}</button></td>
          <td>{row.Description}</td>
          <td><a href={row.Link}>Link</a></td>
        </tr>
      )
    });
    return(
      <tbody>
        {rows}
      </tbody>
    );
  }

  function toOnetJob(e){
    console.log(e.target.value)
    localStorage.setItem("OnetJob", e.target.value)
    navigate('/OnetJob', {replace: true});
  }

return (
    <div className = "Dash">
      <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
      <button id="Back" type="button" onClick={toDashboard}>Back</button>
      <h1> List of O*Net Jobs</h1>
      <div className = "OnetJobsTable">
        <table className ="table2">
        
          <ShowJobs jobs={jobs}/>

        </table>
      </div>
    </div>
  );
}

export default OnetJobs;