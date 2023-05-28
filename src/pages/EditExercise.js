import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditExercise() {

  const [exerciseData, setExerciseData] = useState({})
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

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
      setExerciseData(data)
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


  // PUT data to the backend
  async function editExercise(url, token){
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({...exerciseData})
    })
    const data = await response.json()
    console.log(data)
  }

  async function handleSubmit(e){
    e.preventDefault()

    editExercise(apiUrl, accessToken)

    notify()
    setTimeout(()=>{
      navigate(-1)

    },2000)
  }

  if(loading){
    return (
      <div className='centered'>
        <h1>Loading ....</h1>
      </div>
    )
  }

  return (
    <div className='newExercise'>
      <h1>Edit Exercise</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Submit"/>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditExercise