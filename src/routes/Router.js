import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages 
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import PrivateRoutes from './PrivateRoutes';
import Exercises from '../pages/Exercercises';
import NewExercise from '../pages/NewExercise';
import NavBar from '../Components/NavBar';
import Exercise from '../pages/Exercise';
import EditExercise from '../pages/EditExercise';

export default function Router(){
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/'  element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes/>}>
              <Route path='/exercises' element={<Exercises/>} />
              <Route path='/exercises/:id' element={<Exercise/>} />
              <Route path='/exercises/edit/:id' element={<EditExercise/>} />
              <Route path='/exercises/:id' element={<Exercise/>} />
              <Route path='/newexercise' element={<NewExercise/>} />
            </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

