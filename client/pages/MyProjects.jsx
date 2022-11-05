import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Project from '../components/Project.jsx';

/* 
  MyProjects needs:
  Header
  Sidebar
  Project cards -> only ones you have made
  
*/
// ! Do we want Login to be its own page?

const MyProjects = () => {
  return (
    <div>
      <div>MyProjects</div>
      <Link
          to={'/create'}
        >
          <button id = "create-project" type="button">Create a new project!</button>
        </Link>
      <div>
        <Project />
      </div>
    </div>
  );
};

export default MyProjects;
