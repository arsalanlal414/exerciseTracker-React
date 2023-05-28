import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './exercise.scss'

const NewExercise = () => {
  // const navigate = useNavigate()
  const [exerciseData, setExerciseData] = useState({
    name: "",
    desc: "",
    type: "",
    duration: "",
    date: ""
  })

  const notify = () => toast.success('Activity Added Successfully', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


  // Call the function and pass the URL and access token
  const apiUrl = 'http://localhost:5001/api/exercise';
  const accessToken = localStorage.getItem("accessToken")

  // POST data to the backend
  async function createExercise(url, token){
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({...exerciseData})
    })
    const data = await response.json()
    console.log(data)
  }

  // handling the submistion
  const handleSubmit = async (e) =>{
    e.preventDefault()
    createExercise(apiUrl, accessToken)
    setExerciseData({
      name: "",
      desc: "",
      type: "",
      duration: "",
      date: ""
    })
    notify()
    // navigate('/')
  }

  return (
    <div className='newExercise'>
      <h1>Add Exercise</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Name</label><br/>
          <input value={exerciseData.name} type="text" placeholder='Enter Exercise Name' onChange={(e)=> setExerciseData({...exerciseData, name: e.target.value})} required/>
        </div>
        <div>
          <label htmlFor="description">Description</label><br/>
          <input value={exerciseData.desc} type="text" placeholder='Description' onChange={(e)=> setExerciseData({...exerciseData, desc: e.target.value})} required/>
        </div>
        <div>
          <label htmlFor="activity">Activity Type</label><br/>
          <select value={exerciseData.type} name="type" onChange={(e)=> setExerciseData({...exerciseData, type: e.target.value})} required>
            <option className='acticity-type' value="">Activity Type</option>
            <option className='acticity-type' value="running">Running</option>
            <option className='acticity-type' value="cycling">cycling</option>
            <option className='acticity-type' value="hiking">hiking</option>
            <option className='acticity-type' value="walking">walking</option>
            <option className='acticity-type' value="swimming">swimming</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration">Duration</label><br/>
          <input value={exerciseData.duration} type="text" placeholder='Duration in minutes' onChange={(e)=> setExerciseData({...exerciseData, duration: e.target.value})} required/>
        </div>
        <div>
          <label htmlFor="date">Date</label><br/>
          <input value={exerciseData.date} type="date" placeholder='Date' onChange={(e)=> setExerciseData({...exerciseData, date: e.target.value})} required/>
        </div>
        <input type="submit" value="Add Exercise"/>
      </form>
      <ToastContainer />
    </div>
  )
}

export default NewExercise