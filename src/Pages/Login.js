import React, {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/App.css';
import '../Styles/LoginStyles.css'

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

function Login() {

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
        console.log(AccountDB[i])
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
            {/* <h2>UserName: </h2>
            <h2>{Username}</h2> */}
          </div>
          <div className = "passwordLogin">
          <input type="text" onChange={changePassword} placeholder='Password'/>
            {/* <h2>Password: </h2>
            <h2>{Password}</h2> */}
          </div>
          <button id="loginButton" onClick={validateLogin} >Login</button> 

    </div>
  );
}

export default Login;
