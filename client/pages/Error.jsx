import React from 'react';
import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';

const Error = () => {
  return (
    <div className='section__errorpage section__padding'>
      <div className='section__errorpage-content'>
        <Fade bottom>
          <h2>Page Not Found</h2>
        </Fade>
        <Fade left>
          <div className='error404'>
            <h2> 404</h2>
          </div>
        </Fade>
        <Fade bottom>
          <Link to='/' className='contact-button'>
            <div>
              <span className='bg switch__bg'></span>
              <span className='base switch__border-color'></span>
              <span className='text'>Back Home</span>
            </div>
          </Link>
        </Fade>
      </div>
      <Fade right></Fade>
    </div>
  );
};

export default Error;
