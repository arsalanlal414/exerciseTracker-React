import React from 'react';
import { useState } from "react";

const Singup = () =>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    async function handleSubmit(event){
      // event.preventDefault()
      // const response = await fetch('http://localhost:5001/api/users/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body:JSON.stringify({
      //     username: name,
      //     email,
      //     password
      //   })
      // })
      // console.log(response.json())
      // console.log(name, email, password)
    }
  
    return(
      <>
        <h1>Singup</h1>
        <form onSubmit={handleSubmit}>
          <input value={name} type="text" placeholder="name" onChange={(e)=> setName(e.target.value)} /><br />
          <input value={email} type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/><br />
          <input value={password} type="password" placeholder="passord" onChange={(e)=> setPassword(e.target.value)}/><br />
          <input type="submit" value="SignUp"/>
        </form>
      </>
    )
  }

  export default Singup;
  