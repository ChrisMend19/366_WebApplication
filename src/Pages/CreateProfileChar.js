import React, {useState, Component, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import '../Styles/CreateProfileCharStyles.css'

function CreateProfileChar() {

  const navigate = useNavigate();

  function toLogin(){
    localStorage.setItem("LoginUsername", NaN) 
    navigate('/', {replace: true});
  } 
  function toDashboard(){
    localStorage.setItem("CurrentSurvey", NaN) 
    navigate('/Dashboard', {replace: true});
  }

  const [newProfileChar, setProfileChar] = useState({Dimension: "", Name: "", Description: ""})

  function setSavedProfileChar(){
      console.log(newProfileChar)
  }

  function setDimension(event){
    setProfileChar({Dimension: event.target.value, Name: newProfileChar.Name, Description: newProfileChar.Description});
  }

  function setName(event){
    setProfileChar({Dimension: newProfileChar.Dimension, Name: event.target.value, Description: newProfileChar.Description});
  }

  function setDescription(event){
    setProfileChar({Dimension: newProfileChar.Dimension, Name: newProfileChar.Name, Description: event.target.value});
  }


  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <button onClick={setSavedProfileChar} id="Save" type="button">Save</button>
        <h1>Create New Profile Characteristic</h1>
        <div class="createProfileCharDimension">
            <input onChange={setDimension} type="text" placeholder='Character Dimension'/>
        </div>
        <div class="createProfileCharName">
            <input onChange={setName} type="text" placeholder='Name of Characteristic'/>
        </div>
        <div class="createProfileDescription">
            <textarea onChange={setDescription} type="text" placeholder='Description of Characteristic'/>
        </div>
    </div>
  );
}


export default CreateProfileChar;
