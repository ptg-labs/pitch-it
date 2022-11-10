import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo.jsx';

/*
  Need for login page:
    header -> TeamFinder
    Username -> submit form
    Password -> submit form
    Submit Button
    Link -> Sign-up
*/

const LoginTwo = () => {
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
    // prevent a page refresh
    event.preventDefault();
    // do a check on the input types
    if (!inputData.username || !inputData.password) return setValid(false);
    // Send an asynchronous post request to our server, which should handle logging in
    //TODO: Add redirect to login page
    (async function loginUser() {
      try {
        await axios
          .post('http://localhost:3000/user/login', inputData) // sending inputData which has username, password
          .then((response) => {
            setValid(false);
            setInputData(initialInputState);
            return response.data;
          })
          .then((data) => {
            document.cookie = `token=${data.jwt}`;
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
    <main className='login-signup'>
      <section className='container'>
        <header>
          <div className='logo'>
            <span>
              <Logo />
            </span>
          </div>
          <h1>Pitch It</h1>
        </header>
        <section className='main-content'>
          <form
            action=''
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              placeholder='Username'
              value={inputData.username}
              onChange={(e) => handleInputChange(e, 'username')}
            />
            <div className='line'></div>
            <input
              type={hidePW ? 'password' : 'text'}
              placeholder='Password'
              value={inputData.password}
              onChange={(e) => handleInputChange(e, 'password')}
            />
            {/*TODO: Redirect user to home page when they create an account*/}
            <button type='submit'>Login</button>
            {/* Conditionally render an error message if the user input is invalid */}
            {!valid && (
              <span className='input-error'>
                Please enter a valid username and password
              </span>
            )}
          </form>
        </section>
        <footer>
          <p>
            <a
              href=''
              title='Register'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default LoginTwo;
