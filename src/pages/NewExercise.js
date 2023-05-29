import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewExercise = () => {
 
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
      createExercise(apiUrl, accessToken, values)
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


  // Call the function and pass the URL and access token
  const apiUrl = 'http://localhost:5001/api/exercise';
  const accessToken = localStorage.getItem("accessToken")

  // POST data to the backend
  async function createExercise(url, token, values){
    const {name, desc, type, duration } = values
    const date = new Date(values.date).toISOString().split("T")[0]
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({name, desc, type, duration, date})
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className='newExercise'>
      <h1>Add Exercise</h1>
      <form onSubmit={formik.handleSubmit} >
        <div>
          {/* <label htmlFor="name">Name</label><br/>
          <input value={exerciseData.name} type="text" placeholder='Enter Exercise Name' onChange={(e)=> setExerciseData({...exerciseData, name: e.target.value})} required/>
           */}
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
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
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
        <input type="submit" value="Add Exercise"/>
      </form>
      <ToastContainer />
    </div>
  )
}

export default NewExercise