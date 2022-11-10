import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Project from '../components/Project.jsx';
import '../styles/myprojects.scss';

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
  // const [ranOnce, setRanOnce] = useState(false);
  const [formData, setFormData] = useState();
  // Send a get request to the server on page load to pull in all my projects
  const getMyProjects = async () => {
    try {
      const myProjects = await axios.get(
        `http://localhost:3000/projects/owned`
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
  // const handleDelete = async (project_id) => {
  //   // setRanOnce here so that useEffect fires
  //   setRanOnce(false);
  //   const deleteProject = await axios.delete(
  //     `http://localhost:3000/projects/${project_id}`
  //   );
  //   setMyProjects((prevState) => {
  //     console.log(prevState);
  //     return prevState.filter((obj) => obj.project_id !== project_id);
  //   });
  // };
  const handleDelete = () => {
    console.log('deleting project');
  };
  const handleUpdate = () => {
    console.log('updating project');
  };
  const toggleEditor = () => {
    console.log('toggling editor');
  };
  // TODO: FIGURE OUT LESS HACKY WAY TO AVOID INFINITE LOOP
  // useEffect(() => {
  //   if (!ranOnce) {
  //     getMyProjects();
  //     setRanOnce(true);
  //   }
  // }, [myProjects]);
  // if (myProjects.length === myProjects.length) return null;
  const dummy = {
    id: 1,
    owner_name: 'Mike',
    title: `Mike's Project`,
    description: `Mike's description`,
    skills: ['CSS', 'HTML'],
    date: '2022-11-10',
  };
  return (
    <div id='myprojects-div'>
      {/* editor modal */}

      {/* page */}
      <div className='myproject-header'>My Pitches</div>
      <hr />
      <div className='myprojects-button-container'>
        <Link to={'/create'}>
          <button
            id='create-project'
            type='button'
          >
            Pitch a new project!
          </button>
        </Link>
      </div>

      {/* <div className="project-card-container">{myProjects}</div> */}
      <Project
        project_id={dummy.id}
        owner_name={dummy.owner_name}
        title={dummy.project_name}
        description={dummy.description}
        skills={dummy.skills}
        date={dummy.date}
        isOwner={true}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toggleEditor={toggleEditor}
      />
    </div>
  );
};

export default MyProjects;
