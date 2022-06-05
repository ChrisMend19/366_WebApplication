import React, {useState, Component} from 'react';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import Onet1 from '../Data/OnetJobs.json'
// import Dashboard from './Dashboard'


export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function Jobs() {


    return (
        <div className = "Dash">
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