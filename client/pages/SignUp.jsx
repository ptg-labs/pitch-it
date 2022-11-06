import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import MainContainer from './containers/MainContainer';
import axios from 'axios';
const SignUp = () => {
  // We want multiple hooks here
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
          .post('http://localhost:3000/user/signup', inputData)
          .then((response) => {
            setInputData(initialInputState);
            console.log(response.data);
          })
          .then((data) => {
            // pass the specific user's username and user_id to the /home page
            return navigate('/');
          });
      } catch (err) {
        console.log('Broke in logging in');
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
          Submit
        </button>
        <br></br>
        {!valid && (
          <span className='input-error'>
            Please enter a valid username and password
          </span>
        )}
      </form>
    </div>
  );
};

export default SignUp;
