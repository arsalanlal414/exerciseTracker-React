import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditExercise() {

  const [exerciseData, setExerciseData] = useState({})
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, 'Name should not exceed 30 characters.')
      .matches(/^[A-Za-z\s]+$/, 'Exercise name should contain only English alphabets.')
      .required('Exercise name is required.'),
    desc: yup
      .string()
      .max(30, 'Description should not exceed 30 characters.')
      .required('Description is required.'),
    type: yup.string().required('Exercise type is required.'),
    duration: yup
      .number()
      .typeError('Duration must be a number (in minutes).')
      .positive('Duration must be a positive number (in minutes).')
      .required('Duration is required.'),
    date: yup
      .date()
      .min(new Date(), 'Date must be today or a future date.')
      .required('Date is required.'),
  });
  console.log(exerciseData.name)

  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      type: "",
      duration: "",
      date: ""
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      editExercise(apiUrl, accessToken, values)
      resetForm();
      notify()
    },
  });

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
      // console.log(data)
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  }

  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = `http://localhost:5001/api/exercise/${id}`;
  
  // Call the function and pass the URL and access token
  // getDataWithToken(apiUrl, accessToken);
//  console.log( new Date(exerciseData.date).toISOString().split("T")[0])
  useEffect(()=>{
    getExercise(apiUrl, accessToken)
  },[accessToken])

  useEffect(()=>{
    formik.setValues({...exerciseData});
  },[exerciseData])


  // PUT data to the backend
  async function editExercise(url, token, values){
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({...values})
    })
    const data = await response.json()
    console.log(data)
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
      {exerciseData && (
        <form onSubmit={formik.handleSubmit} >
          {/* {const {name, desc, type, duration, date} = exerciseData} */}
          <div>
            <label htmlFor="name">Exercise Name:</label><br/>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error" >{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="description">Description:</label><br />
            <input
              type="text"
              id="desc"
              name="desc"
              placeholder='Description'
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.desc && formik.errors.desc && (
              <div className="error">{formik.errors.desc}</div>
            )}
          </div>
          <div>
            <label htmlFor="type">Activity Type:</label><br />
            <select
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Activity Type</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="hiking">Hiking</option>
              <option value="walking">Walking</option>
              <option value="swimming">Swimming</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <div className="error">{formik.errors.type}</div>
            )}
          </div>
          <div>
            <label htmlFor="duration">Duration (minutes):</label><br />
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder='Duration'
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.duration && formik.errors.duration && (
              <div className="error">{formik.errors.duration}</div>
            )}
          </div>
          <div>
            <label htmlFor="date">Date:</label><br />
            <input
              type="date"
              id="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date && (
              <div className="error">{formik.errors.date}</div>
            )}
          </div>
          <input type="submit" value="Edit Exercise"/>
        </form>
      )}
      <ToastContainer />
    </div>
  )
}

export default EditExercise