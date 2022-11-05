import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  // this is used to populate my projects
  const [myProjects, setMyProjects] = useState([]);
  // This is a function used to delete projects
  const handleDelete = () => {};
  // Send a get request to the server on page load to pull in all my projects
  const getMyProjects = async () => {
    console.log('getRequest');
    try {
      const myProjects = await axios.get(
        `http://localhost:3000/projects/${localStorage.getItem('user_id')}`
      );
      console.log(myProjects.data);
      setMyProjects(
        myProjects.data.map((obj) => {
          return (
            <Project
              key={obj.id.toString()}
              project_id={obj.id.toString()}
              owner_name={obj.owner_name}
              title={obj.project_name}
              description={obj.description}
              skills={obj.skills}
              date={obj.date}
              handleDelete={handleDelete}
            />
          );
        })
      );
      return;
    } catch (err) {
      alert("Couldn't fetch my projects");
    }
  };
  useEffect(() => {
    console.log('use-effect triggered');
    getMyProjects();
  }, []);
  // if (myProjects.length === myProjects.length) return null;
  return (
    <div>
      <div>MyProjects</div>
      <Link to={'/create'}>
        <button id='create-project' type='button'>
          Create a new project!
        </button>
      </Link>
      {myProjects}
    </div>
  );
};

export default MyProjects;
