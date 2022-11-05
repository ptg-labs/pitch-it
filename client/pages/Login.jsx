import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Links,
  useNavigate,
} from 'react-router-dom';
// import MainContainer from './containers/MainContainer';
import axios from 'axios';
// import SignUp from './SignUp.jsx';



/*
  Need for login page:
    header -> TeamFinder
    Username -> submit form
    Password -> submit form
    Submit Button
    Link -> Sign-up
*/

const Login = () => {
  // This hook will change state if the user's input is invalid
  const [valid, setValid] = useState(true);
  // This hook will change our password's type to password
  const [hide, setHide] = useState(true);
  // Create a hook that handles input changes for either username or password
  const initialInputState = {
    username: '',
    password: '',
  };
  // we want to useNavigate as a side effect of successful login
  const navigate = useNavigate();
  const hidePW = () => setHide((prevState) => !prevState);
  // This hook will change state depending on the user's inputs
  const [inputData, setInputData] = useState(initialInputState);
  // create a handle input change function
  const handleInputChange = (e, inputId) => {
    return setInputData((prevState) => ({
      ...prevState,
      [inputId]: e.target.value,
    }));
  };
  // Clear localStorage in login
  useEffect(() => {
    localStorage.clear();
  }, []);
  // create a handle submit function
  const handleSubmit = (event) => {
    // prevent a page referesh
    event.preventDefault();
    // do a check on the input types
    if (!inputData.username || !inputData.password) return setValid(false);
    // Send an asynchronous post request to our server, which should handle logging in
    (async function loginUser() {
      try {
        await axios
          .post('http://localhost:3000/user/login', inputData)
          .then((response) => {
            setValid(false);
            setInputData(initialInputState);
            return response.data;
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem('username', data.username);
            localStorage.setItem('user_id', data.user_id);
            return navigate('/home');
          });
      } catch (err) {
        alert('Incorrect username or password!');
      }
    })();
  };
  return (
    <div className='auth-page'>
      {/* The button has a type submit, which will trigger the onSubmit functionality */}
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='username'
          type='text'
          placeholder='UserName'
          value={inputData.username}
          onChange={(e) => handleInputChange(e, 'username')}
        ></input>
        <input
          className='password'
          type={hidePW ? 'password' : 'text'}
          placeholder='Password'
          value={inputData.password}
          onChange={(e) => handleInputChange(e, 'password')}
        ></input>
        <button className='login-button' type='submit'>
          Log In
        </button>
        <br></br>
        {/* Conditionally render an error message if the user input is invalid */}
        {!valid && (
          <span id='goal-error'>
            Please type in a valid username and password
          </span>
        )}
      </form>
      <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
};

export default Login;
