import React from 'react';
import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';

const Error = () => {
  return (
    <div className='section__errorpage section__padding'>
      <h1>404</h1>
      <Link
        to='/'
        className='contact-button'
      >
        <span className='text'>Back Home</span>
      </Link>
    </div>
  );
};

export default Error;
