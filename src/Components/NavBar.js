import React, { useState } from 'react'
import './navStyle.scss'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [isActive, setIsActive] = useState(true)
  const navigate = useNavigate()

  function handleNavigation(){
    navigate("/")
  }
  return (
    <div className='navbar'>
      <div className="container">
        <div className='logo'>
          <h1 onClick={handleNavigation}>Exercise Tracker</h1>
        </div>
        <nav className='nav'>
          <ul>
            <li><p>Home</p></li>
            <li><p>Singin</p></li>
            <li><p>Signup</p></li>
          </ul>
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