import React, { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './exercise.scss'

function Exercises() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const notify = () => toast.success('Item Deleted Successfully', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  async function getExercises(url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      // Process the response data
      setExercises(data)
      setLoading(false)
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  }

  async function handleDelete(id){
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      // const data = await response.json();
      notify()
      setExercises(exercises.filter(e => e._id !== id))
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  }

  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = 'http://localhost:5001/api/exercise';
  
  
  // Call the function and pass the URL and access token
  // getDataWithToken(apiUrl, accessToken);
  
  useEffect(()=>{
    getExercises(apiUrl, accessToken)
  },[accessToken])
  
  function handleAddExercise(){
    navigate('/newexercise')
  }

  if(loading){
    return <div className='centered'>
        <h1>Loading ....</h1>
      </div>
  }

  return (
    <div className='my-exercises'>
      <div className='container'>
        <div className='heading'>
          <h1>Exercises</h1>
          <button onClick={handleAddExercise}>Add Exercise</button>
        </div>
        {
          exercises.length ?   
          <div className='cards'>
            {exercises.map(exercise=>{
              const {_id, name, desc, type, duration, date} = exercise
              return(
                <article key={_id} className='card' >
                  <Link to={`/exercises/${_id}`} >
                    <div className='details'>
                      <h1>{name}</h1>
                      <h4>{desc.substring(0,20)}</h4>
                      <p>duration: {duration}</p>
                      <p>type: {type}</p>
                      <p>date: {date}</p>
                    </div>
                  </Link>
                  <div className='buttons'>
                    <Link to={`/exercises/edit/${_id}`} >
                      <button className='btn-update'>Update</button>
                    </Link>
                    <button className='btn-delete' onClick={()=> handleDelete(_id)}>Delete</button>
                  </div>
                </article>
              )
            })}
          </div> : <h1>No Data Found</h1>
        }
        <ToastContainer />
      </div>
    </div>
  )
}

export default Exercises