import React from 'react';
import { useEffect, useState, useNavigate } from 'react';
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
  // create a handle submit function
  const handleSubmit = (event) => {
    return navigate('/home');
    // prevent a page referesh
    event.preventDefault();
    // do a check on the input types
    if (!inputData.username || !inputData.password) return setValid(false);
    // Send an asynchronous post request to our server, which should handle logging in
    (async function signupUser() {
      try {
        await axios
          .post('http://localhost:3000/auth/singup', inputData)
          .then((response) => {
            setInputData(initialInputState);
            console.log(response.data);
          })
          .then((data) => {
            // pass the specific user's username and user_id to the /home page
            return navigate('/home', {
              state: { username: data.username, user_id: data.user_id },
            });
          });
      } catch (err) {
        console.log('Broke in logging in');
      }
    })();
  };
  return (
    <div className="auth-page">
      {/* The button has a type submit, which will trigger the onSubmit functionality */}
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          className="username"
          type="text"
          placeholder="UserName"
          value={inputData.username}
          onChange={(e) => handleInputChange(e, 'username')}
        ></input>
        <input
          className="password"
          type={hidePW ? 'password' : 'text'}
          placeholder="Password"
          value={inputData.password}
          onChange={(e) => handleInputChange(e, 'password')}
        ></input>
        <button
          className="login-button"
          type="submit"
        >Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
