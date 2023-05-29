import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { RxFramerLogo } from 'react-icons/rx';
import './home.scss'

function Home() {

  if(localStorage.getItem("accessToken")){
    return <Navigate to="/exercises" />
  }
  return (
    <div>
      <div className='home'>
        <RxFramerLogo size="100px" className='Logo-icon'/>
        <h1>WELCOME TO EXERCISE TRACKER APP</h1>
        <p>Login with your login credential to continue</p>
        <div>
          <Link to="/login"><button><p>Log in</p></button></Link>
          <Link to="/signup"><button><p>Sign up</p></button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home