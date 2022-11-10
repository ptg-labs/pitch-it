import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

// The below is utilized for testing purposes
const MyProjects = () => <div>You are on the MyProjects page</div>
const Home = () => <div>You are home</div>
const Create = () => <div>Project page</div>

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}
// end of testing

// use React Router to route to different pages
const MainContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/MyProjects' element={<MyProjects />}></Route>
        <Route path='/create' element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainContainer;
