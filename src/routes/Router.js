import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


//pages 
import Singup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import PrivateRoutes from './PrivateRoutes';
import Exercises from '../pages/Exercercises';
import NewExercise from '../pages/NewExercise';


export default function Router(){
  return (
    <div>
        {/* <h1>hello world</h1> */}
        <BrowserRouter>
            <Routes>
                <Route path='/'  element={<Home />} />
                  <Route path="/signup" element={<Singup />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<PrivateRoutes/>}>
                    <Route path='/exercises' element={<Exercises/>} />
                    <Route path='/newexercise' element={<NewExercise/>} />
                  </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

