import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import LoginInfo from './Login'
import Survey1 from '../Data/Surveys.json'
import Jobs from './OnetJobs.js';

function Dashboard() {
    const navigate = useNavigate();
    const toOnetJobs = useCallback(() => navigate('/Jobs', {replace: true}), [navigate]);
    const toLogin = useCallback(() => navigate('/', {replace: true}), [navigate]);

    const saved = localStorage.getItem("user");
    function printUser(){
        console.log(LoginInfo.prototype)
    }

  return (
    <div className = "AdminDashboard">
      <button type="button" onClick={toLogin}>
      Back
    </button>
        {/* <button onClick={printUser} >Print</button>  */}
        <h1>UserName {saved}</h1>
    <h1> List of Surveys</h1>
    <div class="tContainer">
      <table class="table">
        {Survey1.map((postDetail,index) => {
        return <tbody>
          <tr>{postDetail.title}</tr>
            {/* <th>{postDetail.content}</th> */}
          </tbody>
        
      })}
      </table>
    </div>

    <div class="DashboardButtons">
    <button type="button" onClick={toOnetJobs}>
      Browse ONet Jobs
    </button>

    

    </div>
</div>
  );
}



export default Dashboard;
