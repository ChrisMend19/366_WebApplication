import React, {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/LoginStyles.css'
import { LoginInfo } from './OnetJobs';
// import { LoginInfo } from './OnetJobs';

const AccountDB = [
  {
    'username' : 'Chris',
    'password' : 'Mendoza'
  },
  {
    'username' : 'Ollie',
    'password' : 'Dolan'
  }
]

export const TypedLoginInfo = {
  'username' : '',
  'password' : ''
}

export function Login() {

  const navigate = useNavigate();
  const toDashboard = useCallback(() => navigate('/Dashboard', {replace: true}), [navigate]);

  const [LoginInfo, setstate] = useState({username: "", password: ""})
  
  const changeUsername = (event) => {  
    setstate({username: event.target.value, password: LoginInfo.password}); 
      };

  const changePassword = (event) => {  
    setstate({username: LoginInfo.username, password: event.target.value}); 
  };

  function validateLogin(){
    for (let i = 0; i < AccountDB.length; i++){
      if (AccountDB[i].username === LoginInfo.username && AccountDB[i].password === LoginInfo.password){
        // console.log(AccountDB[i])
        localStorage.setItem("LoginUsername", AccountDB[i].username)
        toDashboard()
      }
    }
    console.log("Invalid Creditials")
  }

  return (
    <div className = "adminLogin">
        <h1>Administrator Login</h1>
          <div className="usernameLogin">
            <input type="text" onChange={changeUsername} placeholder='Username'/>
          </div>
          <div className = "passwordLogin">
          <input type="text" onChange={changePassword} placeholder='Password'/>
          </div>
          <button id="loginButton" onClick={validateLogin} >Login</button> 
          

    </div>
  );
}

export default Login;
