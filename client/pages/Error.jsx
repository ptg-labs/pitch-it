import React from 'react';
import { Link } from 'react-router-dom';

// error page for if client url is not accessible
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
