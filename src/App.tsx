import React, { useState } from 'react';
import PageLayout from './Components/Layout';
import Login from './Pages/Login';
import {useMsal} from '@azure/msal-react'
import { loginRequest } from './msalconfig';
import { useNavigate } from "react-router-dom";

import './App.css';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const App: React.FC = () => {
  const [isLogin, setIsLogin]:any = useState(sessionStorage.getItem('token') ? true : false)
  const {instance} = useMsal()
  const navigate = useNavigate();

  const handleLogin = (values: FieldType) => {
    if(values.username === 'admin' && values.password === 'admin'){
      setIsLogin(true)
    }
  }
  const handleSSOLogin = () => {
    try{
      instance.loginPopup(loginRequest).then(
        // add path for the page to be displayed after sso login
       (res) => {
        console.log(res, 'loginRequest')
        if(res?.accessToken){
          setIsLogin(true)
          sessionStorage.setItem('token', res?.accessToken)
        }
       }
       
      )
    }
    catch(error){
      console.log(error)
    }
  }

  const handleLogout = () => {
    setIsLogin(false)
    sessionStorage.removeItem('token');
    navigate('/')
    window.location.reload();
  }

 
  return (
    isLogin ? <PageLayout handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} handleSSOLogin={handleSSOLogin} />
    
  );
};

export default App;