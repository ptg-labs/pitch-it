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
  const [ranOnce, setRanOnce] = useState(false);
  // Send a get request to the server on page load to pull in all my projects
  const getMyProjects = async () => {
    try {
      const myProjects = await axios.get(
        `http://localhost:3000/projects/${localStorage.getItem('user_id')}`
      );
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
  // This is a function used to delete projects
  const handleDelete = async (project_id) => {
    // setRanOnce here so that useEffect fires
    setRanOnce(false);
    const deleteProject = await axios.delete(
      `http://localhost:3000/projects/${project_id}`
    );
    setMyProjects((prevState) => {
      console.log(prevState);
      return prevState.filter((obj) => obj.project_id !== project_id);
    });
  };
  useEffect(() => {
    if (!ranOnce) {
      getMyProjects();
      setRanOnce(true);
    }
  }, [myProjects]);
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
