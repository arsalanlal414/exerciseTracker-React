import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ExerciseIcon from '../Components/ExerciseIcon';
import './exercise.scss'

function Exercise() {

  const [exercise, setExercise] = useState({})
  const [loading, setLoading] = useState(true)
  const {id} = useParams();
  const navigate = useNavigate()
  console.log("id for this exxercise is: ",id)


  async function getExercise(url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setExercise(data)
      setLoading(false)
      console.log(data)
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  }

  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = `http://localhost:5001/api/exercise/${id}`;
  
  // Call the function and pass the URL and access token
  // getDataWithToken(apiUrl, accessToken);
  
  useEffect(()=>{
    getExercise(apiUrl, accessToken)
  },[accessToken])

  function handleBack(){
    navigate(-1)
  }

  if(loading){
    return <div className='centered'>
        <h1>Loading ....</h1>
      </div>
  }
  return (
    <div className='exercise-details'>
      <h1 className='top-head'>Exercise Details</h1>
      <div className='container'>
        <ExerciseIcon type={exercise.type}/>
        <h1>{exercise.name.toUpperCase()}</h1>
        <div className="details">
          <div className='left'>
            <p><b>Description: </b><span>{exercise.desc.substring(0,20)}</span></p>
            <p><b>Type: </b>{exercise.type}</p>
          </div>
          <div className='right'>
            <p><b>Duration: </b><span>{exercise.duration} <small>min</small> </span></p>
            <p><b>Date: </b>{exercise.date}</p>
          </div>
        </div>
        <button onClick={handleBack}>Go Back</button>
      </div>
    </div>
  )

}

export default Exercise