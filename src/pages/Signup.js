// import React from 'react';
// import { useState } from "react";
// import { Link, Navigate, useNavigate } from 'react-router-dom';

// const Singup = () =>{
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const navigate = useNavigate()
  
//     async function handleSubmit(event){
//       event.preventDefault()
//       const response = await fetch('http://localhost:5001/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username: name,
//           email,
//           password
//         })
//       })
//       navigate('/login')

//       // console.log(await response.json())
//       // console.log(name, email, password)
//     }

//     if (localStorage.getItem("accessToken")) {
//       return <Navigate to="/exercises" />;
//     }
  
  
//     return(
//       <div className='login-signup'>
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label><br />
//             <input value={name} type="name" placeholder="Name..." onChange={(e)=> setName(e.target.value)} required/><br />
//           </div>
//           <div>
//             <label htmlFor="email">Email</label><br />
//             <input value={email} type="email" placeholder="Email..." onChange={(e)=> setEmail(e.target.value)} required/><br />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label><br />
//             <input min="8" max value={password} type="password" placeholder="Password..." onChange={(e)=> setPassword(e.target.value)} required/><br />
//           </div>
//           <input type="submit" value="Sign Up"/>
//         </form>
//         <p>Already have an account? <Link to='/login'>Log in</Link> </p>
//       </div>
//     )
//   }

//   export default Singup;
  
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Singup = () => {

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const notify = () => toast.success('Account Created Successfully', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Name is required')
      .max(30, 'Name should not exceed 30 characters.')
      .matches(/^[A-Za-z\s]+$/, 'name should contain only English alphabets.')
      .matches(/^[^\s]+(\s+[^\s]+)*$/, 'Name should not contain leading or trailing spaces'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        `Password should contain atleast one Uppercase, Lowercase and speacial character`
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values ) => {
      const { name, email, password } = values
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: name,
          email,
          password
        })

      })
      const data = await response.json()

      if(data.title){
        setError(data.message);
      }else{
        notify()
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
    },
  });

  return (
    
    <div className='login-signup'>
      <h1>Sign Up</h1>
      {error ? <Alert severity="error" style={{fontSize: "18px", margin: "auto"}}>{error}</Alert> : null}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label><br/>
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
          <label htmlFor="name">Email:</label><br/>
          <input
            type="text"
            id="email"
            name="email"
            placeholder='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error" >{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="name">Password:</label><br/>
          <input
            type="text"
            id="password"
            name="password"
            placeholder='password'email
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error" >{formik.errors.password}</div>
          )}
        </div>

        <input type="submit" value="Sign Up"/>
      </form>
      <p>Already have an account? <Link to='/login'>Log in</Link> </p>
      <ToastContainer />
    </div>
    // </Formik>
  );
};

export default Singup;
