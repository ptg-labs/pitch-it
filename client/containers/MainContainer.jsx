import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom';


// ONLY USE ROUTES
const MainContainer = () => {
  return (<BrowserRouter>
  <Routes>
    <Route path = "/home" element = {<Home />}></Route>
    <Route path = "/MyProjects" element = {<MyProjects />}></Route>
    <Route path = "/create" element = {<Create/>}></Route>
    </Routes>
  </BrowserRouter>)
};

export default MainContainer