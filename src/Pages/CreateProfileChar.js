import React, {useState, Component, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/DashboardStyles.css'
import '../Styles/CurrentSurvey.css'
import '../Styles/CreateProfileCharStyles.css'
import Axios from 'axios';

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

  //const [newProfileChar, setProfileChar] = useState({Dimension: "", Name: "", Description: ""})
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState("");
  const [description, setDescription] = useState("");
  
/*
function setSavedProfileChar(){
      console.log(newProfileChar)
  }
  function getDimension(event){
    setDimension(event.target.value);
    //setProfileChar({Dimension: event.target.value, Name: newProfileChar.Name, Description: newProfileChar.Description});
  }

  function setName(event){
    setName(event.target.value);
    //setProfileChar({Dimension: newProfileChar.Dimension, Name: event.target.value, Description: newProfileChar.Description});
  }

  function getDescription(event){
    setDescription(event.target.value);
    //setProfileChar({Dimension: newProfileChar.Dimension, Name: newProfileChar.Name, Description: event.target.value});
  }*/
  const [cnt, setCnt] = useState(0);
  async function getNewId(){
    try{
      const count = await Axios.get("http://localhost:4000/CreateProfileChar");
      return count.data;
    } catch (error){
      console.log(error);
    }
  }
  useEffect(() => {getNewId().then( result => {
    if (result){
      setCnt(result);
      console.log(result);
    }});
}, []);
  async function createProfChar(){
    try{
      const res = await Axios.post("http://localhost:4000/CreateProfileChar", {Id: cnt[0].cnt+1, dimension: dimension, char: name, description: description});
      if(res.status === 200){
        toDashboard();
      }
      else{
        console.log(res);
        }
      } catch (error){
      console.log(error);
    }
  }

  return (
    <div className = "CurrentSurvey">
        <button id="Logout" type="button" onClick={toLogin}>Log Out</button>
        <button id="Back" type="button" onClick={toDashboard}>Back</button>
        <button onClick={createProfChar} id="Save" type="button">Save</button>
        <h1>Create New Profile Characteristic</h1>
        <div className="createProfileCharDimension">
            <input onChange={(e)=>setDimension(e.target.value)} type="text" placeholder='Character Dimension'/>
        </div>
        <div className="createProfileCharName">
            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name of Characteristic'/>
        </div>
        <div className="createProfileDescription">
            <textarea onChange={(e)=>setDescription(e.target.value)} type="text" placeholder='Description of Characteristic'/>
        </div>
    </div>
  );
}


export default CreateProfileChar;
