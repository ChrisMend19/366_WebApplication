import React, {useState} from 'react';
import '../App.css';
// import Dashboard from './Dashboard'

const AccountDB = [
  {
    'username' : 'Chris',
    'password' : 'Mendoza'
  }
]

export const LoginInfo = {
  'username' : '',
  'password' : ''
}

function Login() {

  function getUserName(value){
    LoginInfo.username = (value.target.value)
  }

  function getPasswordName(value){
    LoginInfo.password = (value.target.value)
  }

  function printData(){
    console.log(LoginInfo)
  }

  return (
    <div className = "AdminLogin">
        <h1>Administrator Login</h1>
          <div className = "UsernameLogin">
            <input type="text" onChange={getUserName} placeholder='Username'/>
            {/* <h2>UserName: </h2>
            <h2>{Username}</h2> */}
          </div>
          <div className = "PasswordLogin">
          <input type="text" onChange={getPasswordName} placeholder='Password'/>
            {/* <h2>Password: </h2>
            <h2>{Password}</h2> */}
          </div>
          <button onClick={printData} >Login</button> 

    </div>
  );
}

export default Login;
