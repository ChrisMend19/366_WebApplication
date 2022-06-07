import React, {useState, Component, useCallback} from 'react';
import '../Styles/App.css';
import '../Styles/JobStyles.css';
import '../Styles/DashboardStyles.css';
import Onet1 from '../Data/OnetJobs.json';
import {useNavigate} from 'react-router-dom';
import JobChars from '../Data/JobChars.json';
import PopUp from "./PopUp";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}
var charVal = 5;

function Job() {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(5);

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
    const [seen, setSeen] = useState(false);
    const togglePop = () => {
      setSeen(
        !seen
      );
    };
  const toLogin = useCallback(() => navigate('/', {replace: true}), [navigate]);
  const toOnetJobs = useCallback(() => navigate('/OnetJobs', {replace: true}), [navigate]);
  const toDashboard = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);

  const saved = localStorage.getItem("jobtitle");
  const job = localStorage.getItem("job");
  const SelectableOptions = [
    { label: 1, content: "Option 1" },
    { label: 2, content: "Option 2" },
    { label: 3, content: "Option 3" },
  ];
    console.log(job)
    return (
        <div className = "Dash">
          <button {...buttonProps}>Example</button>
          <div className={isOpen ? 'visible' : ''} role='menu'>
            <a {...itemProps[1]} onClick={toDashboard}>With click handler</a>
          </div>

          {seen ? <PopUp toggle={togglePop} /> : null}
          <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
          <button id="Back" type="button" onClick={toOnetJobs}>Back</button>
          <h1> Onet Job Info:  {saved} </h1>
          <table className ="table">
            <thead>
              <tr>
                <th>Job Name Here</th>
                <th>Characteristics</th>
              </tr>
            </thead>
          </table>
          <div className="tContainer">
            <table className = "table">
              <div className="box">
              <p>Onet Job Info....</p>
              </div>
              <div className="box" >
                  <table>
                      <p> Char1:  
                      <button onClick={togglePop}>{q}</button>
                      </p>
                  </table>
              </div>
            </table>
          </div>
        </div>
      );
}

export default Job;