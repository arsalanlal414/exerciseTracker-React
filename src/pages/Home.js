import React from 'react'
import { Link, Outlet } from 'react-router-dom'
// import { IoLogoStencil } from 'react-icons/io'
import { RxStitchesLogo } from 'react-icons/io';
import { RxFramerLogo } from 'react-icons/rx';
import NavBar from '../Components/NavBar'
import './home.scss'

function Home() {
  return (
    <div className='home'>
      <RxFramerLogo size="100px" className='Logo-icon'/>
      <h1>WELCOME TO EXERCISE TRACKER APP</h1>
      <p>Login with your login credential to continue</p>
      <div>
        <button><Link to="/login">Log in</Link></button>
        <button><Link to="/signup">Sign up</Link></button>
      </div>
    </div>
  )
}

export default Home