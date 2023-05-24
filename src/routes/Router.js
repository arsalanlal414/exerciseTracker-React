import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';


//pages 
import Singup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import PrivateRoutes from './PrivateRoutes';
import Users from '../pages/Users';
import Products from '../pages/Products';


export default function Router(){
  return (
    <div>
        {/* <h1>hello world</h1> */}
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} >
                  <Route path="/signup" element={<Singup />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<PrivateRoutes/>}>
                    <Route path='/users' element={<Users/>} />
                    <Route path='/products' element={<Products/>} />
                  </Route>

                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

