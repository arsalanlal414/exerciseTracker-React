import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './form.scss'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
  
    async function handleSubmit(event){
      event.preventDefault()
      try{
        const response = await fetch('http://localhost:5001/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            email,
            password
          })
        })
        const data = await response.json()
        if(data.title){
          setError(data.message)
          setVisible(true)
        }
        localStorage.setItem("accessToken", data.accessToken)
        setLoggedIn(true)
      }catch(err){
        console.log(err)
      }
      
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [visible]);

    if (loggedIn) {
      return <Navigate to="/exercises" />;
    }
  
    return(
      <div className='login-signup'>
        <h1>Login</h1>
        {visible ? <Alert severity="error">{error}</Alert> : null}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label><br />
            <input value={email} type="email" placeholder="Email..." onChange={(e)=> setEmail(e.target.value)} required/><br />
          </div>
          <div>
            <label htmlFor="password">Password</label><br />
            <input value={password} type="password" placeholder="Password..." onChange={(e)=> setPassword(e.target.value)} required/><br />
          </div>
          <input type="submit" value="Login"/>
        </form>
        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
      </div>
    )
  }

  export default Login
  