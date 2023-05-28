import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
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
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      const data = await response.json();
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
    notify()
    setExercises(exercises.filter(e => e._id !== id))
  }

  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = 'http://localhost:5001/api/exercise';
  
  
  // Call the function and pass the URL and access token
  // getDataWithToken(apiUrl, accessToken);
  
  useEffect(()=>{
    getExercises(apiUrl, accessToken)
  }, [])
  
  function handleAddExercise(){
    navigate('/newexercise')
  }

  return (
    <div className='my-exercises'>
      <div className='container'>
        <div className='heading'>
          <h1>Exercises</h1>
          {/* <button onClick={(e)=>{handleLogout(e)}}>Logout</button> */}
          <button onClick={handleAddExercise}>Add Exercise</button>
        </div>
        {
        loading ?
          <h1 className='heading' >Loading ...</h1> :
          exercises.length ?   
          <div className='cards'>
            {exercises.map(exercise=>{
              const {_id, name, desc, type, duration, date} = exercise
              return(
                <article key={_id} className='card' >
                  <div className='details'>
                    <h1>{name}</h1>
                    <h4>{desc}</h4>
                    <p>duration: {duration}</p>
                    <p>type: {type}</p>
                    <p>date: {date}</p>
                  </div>
                  <div className='buttons'>
                    <button className='btn-update' onClick={()=>  console.log(_id)}>Update</button>
                    <button className='btn-delete' onClick={()=>handleDelete(_id)}>Delete</button>
                  </div>
                </article>
              )
            })}
          </div> : <h1 className='heading'>No Data Found</h1>
        }
        <ToastContainer />
      </div>
    </div>
  )
}

export default Exercises