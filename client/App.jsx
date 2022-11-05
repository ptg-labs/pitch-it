import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

// Do we need to hang MainContainer from App or from Login?

// ONLY USE ROUTES
const App = () => {
  return (<BrowserRouter>
  <Routes>
    <Route path = "/" element = {<Login />}></Route>
  </Routes>
  </BrowserRouter>)
};

export default App;