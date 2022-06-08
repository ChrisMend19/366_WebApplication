import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/ShowSurveys.css'
import SurveyResps from '../Data/surveysResponses.json'
import Axios from 'axios';

function Recommendations(){
    const navigate = useNavigate();
    function toLogin(){
        localStorage.setItem("LoginUsername", NaN) 
        navigate('/', {replace: true});
    } 
    function toDashboard(){
        localStorage.setItem("CurrentSurvey", NaN) 
        navigate('/Dashboard', {replace: true});
    }
    const profileId = window.location.pathname.split("/")[3];
    const CurrentSurvey = localStorage.getItem("CurrentSurvey");
    const [recommendations, setRecommendations] = useState([]);
    async function getRecommendations(){
        try {
            const survey = window.location.pathname.split("/")[1];
            const response = window.location.pathname.split("/")[3];
            const responses = Axios.get(`http://localhost:4000/${survey}/Recommendation/${response}`);
            return (await responses).data;
        } catch (err){
            console.log(err);
        }
      }
    
      useEffect(() => {getRecommendations().then( result => {
        if (result){
          setRecommendations(result);
          console.log(result);
        }});
      }, []);
    function ShowRecommendations(props){
        const rows = props.rec.map((row, index) => {
          return(
            <tr key={row.profileId, row.ranking}>
              <td>{row.Title}</td>
              <td>{row.ranking}</td>
              <td>{row.Similarity}</td>
            </tr>
          )
        });
        return(
          <tbody>
            {rows}
          </tbody>
        );
    }
    return (
        <div className = "CurrentSurvey">
            <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
            <button id="Back" type="button" onClick={toDashboard}>Back</button>
            <h1>Survey Name: URE Survey</h1>
            <h1>Profile ID: {profileId}</h1>
            <div className="Recommendations">
              <table className="table">
                <thead>
                    <td>Title</td>
                    <td>Ranking</td>
                    <td>Similarity</td>
                </thead>
                <ShowRecommendations rec={recommendations}/>
              </table>
            </div>
        </div>
    );
}
export default Recommendations;