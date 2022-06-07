import React, {useState, Component, useCallback} from 'react';
import '../Styles/App.css';
import '../Styles/JobStyles.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
import {useNavigate} from 'react-router-dom';
import JobChars from '../Data/JobChars.json'
// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}
var charVal = 5;

function OnetJob() {
  const charData=JobChars.map(
    (char)=>{
        return( 
            <tr key= {char.title}>
                <td> {char.title}</td>
                <td><button type="button">Show Surveys</button></td>
                
            </tr>
            
        )
    }
)
  const navigate = useNavigate();
  const clicked = (e) => {
    toLogin()
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
  const toOnetJob = useCallback(() => navigate('/OnetJobs', {replace: true}), [navigate]);
  const saved = localStorage.getItem("jobtitle");
  const job = localStorage.getItem("job");
    return (
        <div className = "JobContainer">
          <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
          <button id="Back" type="button" onClick={toOnetJob}>Back</button>
          <h1> Onet Job Info:  {saved} </h1>
          <div className="clearfix">
            <div className="box">
            <p>Onet Job Info</p>
            </div>
            <div className="box" >
              <table>
                <thead> Characteristics </thead>
                <p> Char1:  
                  {q}  
                <button onClick={IncrementItem}>+</button>
                <button onClick={DecrementItem}>-</button>
                </p>
              </table>
            </div>
            
          </div>
        </div>
      );
}

export default OnetJob;