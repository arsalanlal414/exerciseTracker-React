import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages 
import Singup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import NavBar from '../Components/NavBar';

export default function Router(){
  return (
    <div>
        {/* <h1>hello world</h1> */}
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/signup" element={<Singup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

