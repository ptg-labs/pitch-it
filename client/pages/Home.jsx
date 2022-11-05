import React, { useEffect, useState } from 'react';
import Project from '../components/Project.jsx';
import axios from 'axios';
// ! do we want the Home component to be a component? Or do we want it to be its own page?
/* 
  What do we need from Home component?
  Header component
  Sidebar component
  Filter buttton (dropdown)
  Project Card components
*/

const Home = () => {
  // this is to pass user information to the home page
  const [projectArr, setProjectArr] = useState([]);
  // Send a get request to the server on page load to pull in all projects in our DB
  const getProjects = async () => {
    try {
      await axios
        .get('http://localhost:3000/api/projects')
        .then((response) => response.data)
        .then((data) => {
          return data.map((obj) => {
            return (
              <Project
                key={obj._id.toString()}
                id={obj._id.toString()}
                title={obj.title}
                description={obj.description}
                skills={obj.skills}
                date={obj.date}
              />
            );
          });
        })
        .then((arr) => setProjectArr(arr));
    } catch (err) {
      alert("couldn't find project");
    }
  };
  useEffect(() => {
    getProjects();
    // populate user
  }, []);
  return (
    <div>
      <div>Home</div>
      <div>
        <span id='username'> Hello, {localStorage.getItem('username')} </span>
      </div>
      <div>{projectArr}</div>
    </div>
  );
};

export default Home;
