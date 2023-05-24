import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
>>>>>>> origin/main

//pages 
import Singup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
<<<<<<< HEAD
import PrivateRoutes from './PrivateRoutes';
import Users from '../pages/Users';
import Products from '../pages/Products';
=======
import NavBar from '../Components/NavBar';
>>>>>>> origin/main

export default function Router(){
  return (
    <div>
        {/* <h1>hello world</h1> */}
        <BrowserRouter>
<<<<<<< HEAD
            
            <Routes>
                <Route path='/' element={<Home />} >
                  <Route path="/signup" element={<Singup />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<PrivateRoutes/>}>
                    <Route path='/users' element={<Users/>} />
                    <Route path='/products' element={<Products/>} />
                  </Route>

                </Route>
=======
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/signup" element={<Singup />} />
                <Route path="/login" element={<Login />} />
>>>>>>> origin/main
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

