import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate   } from 'react-router-dom';

function Exercises() {

  const [exercises, setExercises] = useState([])
  const navigate = useNavigate();

  async function getExercises(url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      // Process the response data
      console.log(data);
      setExercises(data)
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  }
  
  // Call the function and pass the URL and access token
  const apiUrl = 'http://localhost:5001/api/exercise';
  const accessToken = localStorage.getItem("accessToken")
  // getDataWithToken(apiUrl, accessToken);

  useEffect(()=>{
    getExercises(apiUrl, accessToken)
  }, [])

  function handleLogout(){
    localStorage.setItem("accessToken","")
    navigate('/login');
  }


  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={(e)=>{handleLogout(e)}}>Logout</button>
     { exercises.map(exercise=>{
        const {_id, name, desc, type, duration, date} = exercise
        return(
          <li key={_id} style={{border: "2px solid grey", width:"300px", margin: "10px", padding: "15px", }}>
            <div>
              <h1>{name}</h1>
              <p>duration: {duration}</p>
              <p>type: {type}</p>
              <p>date: {date}</p>
            </div>
            <div>
              <button onClick={()=>  console.log(_id)}>Update</button>
              <button onClick={()=>  console.log(_id)}>Delete</button>
            </div>
          </li>
        )
      })}
    </div>
  )
}

export default Exercises