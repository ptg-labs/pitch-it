import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom';
// import all of our routes
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import MyProjects from './pages/MyProjects.jsx';
import Error from './pages/Error.jsx';
import Create from './pages/Create.jsx';
import Favorites from './pages/Favorites.jsx';
import Sidebar from './components/Sidebar.jsx';
import SidebarLayout from './components/SidebarLayout.jsx';
import SignUp from './pages/SignUp.jsx';
// Do we need to hang MainContainer from App or from Login?

// ONLY USE ROUTES
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route element={<SidebarLayout />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/MyProjects' element={<MyProjects />}></Route>
          <Route path='/Favorites' element={<Favorites />}></Route>
          <Route path='/create' element={<Create />}></Route>
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
