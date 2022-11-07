import React, { useEffect, useState } from 'react';
import Project from '../components/Project.jsx';
import Checkbox from '../components/Checkbox.jsx';
import axios from 'axios';
/* 
  What do we need from Home component?
  Header component
  Sidebar component
  Filter buttton (dropdown)
  Project Card components
*/

const Home = () => {
  // this object contains all the skills and initializes their clickState to false
  const skillsObj = {
    React: false,
    Express: false,
    SQL: false,
    Node: false,
    MongoDB: false,
    Javascript: false,
    HTML: false,
    CSS: false,
    Python: false,
    'C++': false,
    Java: false,
    PostgreSQL: false,
    Git: false,
    Vue: false,
    Angular: false,
    'C#': false,
    Docker: false,
    Kubernetes: false,
    Unity: false,
    'Unreal Engine': false,
    'Spring Boot': false,
  };
  // this is to pass user information to the home page
  const [projectArr, setProjectArr] = useState([]);
  // this hook will conditionally render the potential filters
  const [filterPress, setFilterPress] = useState(false);
  // this state hook will say which filters are active
  const [skillState, setSkillState] = useState(skillsObj);
  const handleClick = (skill) => {
    return setSkillState((prevState) => ({
      ...prevState,
      [skill]: !prevState[skill],
    }));
  };
  const checkboxArr = [];
  for (const skill in skillState) {
    skillState[skill];
    checkboxArr.push(
      <Checkbox
        key={skill}
        skill={skill}
        handleClick={handleClick}
        clicked={skillState[skill]}
      />
    );
  }
  // Send a get request to the server on page load to pull in all projects in our DB
  const getProjects = async () => {
    try {
      await axios
        .get('http://localhost:3000/projects/all')
        .then((response) => response.data)
        .then((data) => {
          return data.map((obj) => {
            console.log(obj);
            return (
              <Project
                key={obj.id.toString()}
                project_id={obj.id.toString()}
                owner_name={obj.owner_name}
                title={obj.project_name}
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
  // On page load, run the asynchronous get request
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
      <button onClick={() => setFilterPress(!filterPress)}>Filter</button>
      {filterPress && <div className='filters'>{checkboxArr}</div>}
      <div>{projectArr}</div>
    </div>
  );
};

export default Home;
