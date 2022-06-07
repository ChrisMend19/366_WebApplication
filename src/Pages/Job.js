import React, {useState, Component, useCallback} from 'react';
import '../Styles/App.css';
import './styles.css';
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

function Job() {
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
  const toLogin = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);
  const toJob = useCallback(() => navigate('/Job', {replace: true}), [navigate]);
  const saved = localStorage.getItem("jobtitle");
  const job = localStorage.getItem("job");
    console.log(job)
    return (
        <div className = "Dash">
          <button type="button" onClick={toLogin}>
            Back
          </button>
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

export default Job;