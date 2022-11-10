import React, { useEffect, useState } from 'react';
import Project from '../components/Project.jsx';
import Checkbox from '../components/Checkbox.jsx';
import axios from 'axios';
import '../styles/home.scss';

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
  // this will hold the array of projects to be viewed
  const [projectArr, setProjectArr] = useState([]);
  // this is going to contain the filtered state
  const [filteredProjects, setFilteredProjects] = useState([]);
  // this hook will conditionally render the potential filters
  const [filterPress, setFilterPress] = useState(false);
  // this state hook will say which filters are active
  const [skillState, setSkillState] = useState(skillsObj);
  // this handle click fires whenever a skill is selected
  const handleClick = (skill) => {
    // first change the state of the selected skill
    setSkillState((prevState) => {
      // update the previous state's skills
      const updatedSkills = {
        ...prevState,
        [skill]: !prevState[skill],
      };
      // pick out only the truthy/active skills and create a new array from them, [[key, value], ...]
      const activeSkills = Object.entries(updatedSkills)
        .filter((skill) => skill[1]) // returns a filtered array of skills that are set to true
        .map((skill) => skill[0]); // returns an array of the names of the skills from above
      // set a filtered projects state, projectArr is a redundancy so the filter never returns an empty page
      setFilteredProjects((prevState) => {
        console.log(projectArr);
        const activeFilter = projectArr.filter((project) => {
          return activeSkills.every((skill) =>
            project.props.skills.includes(skill)
          )
            ? true
            : false;
          //TODO: remove redundant ternary above
        });
        return activeFilter;
      });
      return updatedSkills;
    });
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
  // send a get request to the server on page load to pull in all projects in the DB
  const getProjects = async () => {
    console.log(document.cookie);
    // TODO: parse document.cookie for token specifically
    try {
      await axios 
        .get('http://localhost:3000/projects/all', {headers: {'Authorization': `Bearer ${document.cookie}`}})
        .then((response) => response.data)
        .then((data) => {
          return data.map((obj) => {
            const dateObj = new Date(Date.parse(obj.created_at));
            const created_at = dateObj.toDateString();
            return (
              <Project
                key={obj.id.toString()}
                project_id={obj.id.toString()}
                username={obj.username}
                title={obj.project_name}
                description={obj.description}
                skills={obj.skills}
                date={created_at}
              />
            );
          });
        })
        .then((arr) => {
          setProjectArr(arr);
          setFilteredProjects(arr);
        });
    } catch (err) {
      alert("couldn't find project");
    }
  };
  // On page load, run the asynchronous GET request
  useEffect(() => {
    getProjects();
    // populate correct user
  }, []);
  return (
    <div id="homepage-div">
      <div id="Home">Pitches</div>
      <hr />
      <div className="homepage-button-container">
        <button
          className="filter-button"
          onClick={() => setFilterPress(!filterPress)}
        >
          Filter
        </button>
      </div>
      {filterPress && <div className="filters">{checkboxArr}</div>}
      <div className="project-card-container">{filteredProjects}</div>
      <br></br>
    </div>
  );
};

export default Home;
