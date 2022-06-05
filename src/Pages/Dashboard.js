import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';
import "../home.css";
import Surv1 from '../data/surveys.json'
import Jobs from './Jobs.js';

// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function Dashboard() {

  function getUserName(value){
    LoginInfo.username = (value.target.value)
  }

  function getPasswordName(value){
    LoginInfo.password = (value.target.value)
  }

  function printData(){
    console.log(LoginInfo)
  }
  
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate('/Jobs', {replace: true}), [navigate]);


  return (
    <div className = "Dash">
        <h1> List of Surveys</h1>
        <div class = "tContainer">
          <table class = "table">
            {Surv1.map((postDetail,index) => {
            return <tbody>
              <tr>{postDetail.title}</tr>
                <th>{postDetail.content}</th>
              </tbody>
            
          })}
          </table>
        </div>

        <div>
        <button type="button" onClick={handleOnClick}>
          Browse ONet Jobs
        </button>

        </div>
    </div>
  );
}

export default Dashboard;
