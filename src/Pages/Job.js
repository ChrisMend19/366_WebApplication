import React, {useState, Component, useCallback} from 'react';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
import {useNavigate} from 'react-router-dom';
// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function Jobs() {
  const navigate = useNavigate();
  const toLogin = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);

    return (
        <div className = "Dash">
          <button type="button" onClick={toLogin}>
      Back
    </button>
            <h1> List of O*Net Jobs</h1>
            <div class = "tContainer">
              <table class = "table">
                {Onet1.map((postDetail,index) => {
                return <tbody>
                  <tr>{postDetail.title}</tr>
                    <th>{postDetail.content}</th>
                  </tbody>
                
              })}
              </table>
            </div>
        </div>
      );
}

export default Jobs;