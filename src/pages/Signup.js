import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

const Singup = () =>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    async function handleSubmit(event){
      event.preventDefault()
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          username: name,
          email,
          password
        })
      })
      console.log(await response.json())
      console.log(name, email, password)
    }
  
    return(
      <div className='login-signup'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Email</label><br />
            <input value={name} type="email" placeholder="Name..." onChange={(e)=> setName(e.target.value)} required/><br />
          </div>
          <div>
            <label htmlFor="email">Email</label><br />
            <input value={email} type="email" placeholder="Email..." onChange={(e)=> setEmail(e.target.value)} required/><br />
          </div>
          <div>
            <label htmlFor="password">Password</label><br />
            <input value={password} type="password" placeholder="Password..." onChange={(e)=> setPassword(e.target.value)} required/><br />
          </div>
          <input type="submit" value="Sign Up"/>
        </form>
        <p>Already have an account? <Link to='/login'>Log in</Link> </p>
      </div>
    )
  }

  export default Singup;
  