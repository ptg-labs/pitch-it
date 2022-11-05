import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

// ! Do we want Login to be its own page?
// ! What if a user doesn't have an account yet?
// ! Do we want to just use a modal to have them sign up, or redirect them to a new page?

// TODO What if instead of having distinct pages be components, we compartmentalize our interests into a new pages folder?

/* 
  Need for login page:
    header -> TeamFinder
    Username -> submit form
    Password -> submit form
    Submit Button
    Link -> Sign-up
*/

const Login = () => {
  return <div>space saver</div>;
};

export default Login;
