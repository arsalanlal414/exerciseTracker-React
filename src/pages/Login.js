import React from 'react';
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    async function handleSubmit(event){
      // event.preventDefault()
      // const response = await fetch('http://localhost:5001/api/users/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body:JSON.stringify({
      //     email,
      //     password
      //   })
      // })
      // const data = await response.json()
      // localStorage.setItem("accessToken",data.accessToken)
      // console.log("getting token from local storage: ",localStorage.getItem("accessToken"))
      // console.log(email, password)
    }
  
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input value={email} type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/><br />
          <input value={password} type="password" placeholder="passord" onChange={(e)=> setPassword(e.target.value)}/><br />
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }

  export default Login
  