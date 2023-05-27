import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import './exercise.scss'

function Exercises() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
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
      setLoading(false)
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  }
  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = 'http://localhost:5001/api/exercise';
  
  async function handleDelete(id){
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        // body:JSON.stringify({...exerciseData})
      });
      const data = await response.json();
      
      // Process the response data
      console.log(data);
      setExercises(data)
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
    setExercises(exercises.filter(e => e._id !== id))
    console.log("item deleted with id: ", id);
  }
  
  // Call the function and pass the URL and access token
  // getDataWithToken(apiUrl, accessToken);

  useEffect(()=>{
    getExercises(apiUrl, accessToken)
  }, [])

  function handleLogout(){
    localStorage.setItem("accessToken","")
    navigate('/login');
  }

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
          <h1 className='heading'>Loading ...</h1> :
          exercises.length ?   
          <div className='cards'>
            {exercises.map(exercise=>{
              const {_id, name, desc, type, duration, date} = exercise
              return(
                <article key={_id} className='card' >
                  <div>
                    <h1>{name}</h1>
                    <p>duration: {duration}</p>
                    <p>type: {type}</p>
                    <p>date: {date}</p>
                  </div>
                  <div>
                    <button className='btn-update' onClick={()=>  console.log(_id)}>Update</button>
                    <button className='btn-delete' onClick={()=>handleDelete(_id)}>Delete</button>
                  </div>
                </article>
              )
            })}
          </div> : <h1 className='heading'>No Data Found</h1>
        }
      </div>
    </div>
  )
}

export default Exercises