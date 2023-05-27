import React, { useState } from 'react'
import './navStyle.scss'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [isActive, setIsActive] = useState(true)
  const navigate = useNavigate()
  const login = localStorage.getItem("accessToken")

  console.log(login)
  function handleNavigation(){
    navigate("/")
  }

  function handleLogOut(){
    localStorage.setItem("accessToken", "")
    navigate("/")
  }
  return (
    <div className='navbar'>
      <div className="container">
        <div className='logo'>
          <h1 onClick={handleNavigation}>Exercise Tracker</h1>
        </div>
        <nav className='nav'>
          {
            !login ?
              <ul>
                <li><p><Link to="/">Home</Link></p></li>
                <li><p><Link to="/login">Signin</Link></p></li>
                <li><p><Link to="/signup">Sign Up</Link></p></li> 
              </ul>:
              <ul>
                <li><p><Link to="/">Dashboard</Link></p></li>
                <li onClick={handleLogOut}><p>LogOut</p></li>
              </ul>

            }
        </nav>
        <div className='nav-icons'>
          {
            isActive ? 
              <FaBars className='nav-open' onClick={()=> setIsActive(false)}/> :
              <CgClose className='nav-close' onClick={()=> setIsActive(true)}/>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar