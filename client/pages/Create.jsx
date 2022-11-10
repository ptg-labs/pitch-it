import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox.jsx';
import '../styles/create.scss';


const Create = () => {
  // skillsObj contains all the skills and initializes their clickState to false
  // TODO: Stash skillsObj in a separate file and import as needed
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
  // this state hook will say which filters are active
  const [skillState, setSkillState] = useState(skillsObj);
  const handleClick = (skill) => {
    return setSkillState((prevState) => ({
      ...prevState,
      [skill]: !prevState[skill],
    }));
  };
  // add checkboxes to  an array 
  const checkboxArr = [];
  for (const skill in skillState) {
    skillState[skill];
    checkboxArr.push(
      <Checkbox
        type='button'
        key={skill}
        skill={skill}
        handleClick={handleClick}
        clicked={skillState[skill]}
      />
    );
  };
  const defaultInput = {
    project_name: '',
    description: '',
  };
  const [inputData, setInputData] = useState(defaultInput);
  const [duplicate, setDuplicate] = useState(false);
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const handleInputChange = (e, inputId) => {
    return setInputData((prevState) => ({
      ...prevState,
      [inputId]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // populate inputData with required fields
    const filteredSkills = [];
    // push the index of the truthy skills into an array, then send in a request to the backend
    for (const skill in skillState) {
      // if there is a truthy value in the skillState object
      if (skillState[skill])
        // push the index to the filteredSkills array
        // SQL indicies start at 1 so add 1 to each value
        filteredSkills.push(Object.keys(skillsObj).indexOf(skill) + 2);
    }
    // TODO: do not mutate state directly
    const date = new Date();
    inputData.date = date.toDateString();
    inputData.owner_id = 2;
    inputData.owner_name = localStorage.getItem('username');
    inputData.skills = filteredSkills;
    if (
      !inputData.project_name ||
      !inputData.description ||
      !inputData.skills.length
    )
      return setValid(false);
    // send an asynchronous POST request to the server
    (async function postProject() {
      try {
        const postProjectStatus = await axios.post(
          'http://localhost:3000/projects/',
          inputData, {headers: {'Authorization': `Bearer ${document.cookie}`}}
        );
        if (postProjectStatus) {
          setDuplicate(false);
          setValid(true);
          setInputData(defaultInput);
          return navigate('/myprojects');
        }
      } catch (err) {
        // TODO: adjust error handler to not set duplicate for any error
        console.log('catch block');
        setDuplicate(true);
      }
    })();
  };
  // create a template for user to fill in data about their project
  return (
    <div className='project-card-layout'>
      <form
        id='project-creation-form'
        onSubmit={handleSubmit}
      >
        <h1 id='create-header'>Create Pitch</h1>
        <hr />
        {duplicate && (
          <>
            <span className='duplicate-error'>
              A project with this name already exists.
            </span>
            <br></br>
          </>
        )}
        {!valid && (
          <span className='input-error'>
            Please enter valid project information.
          </span>
        )}
        <div className='field'>
          <label>Project Title:</label>
          <input
            type='text'
            id='project-name'
            name='project-name'
            value={inputData.project_name}
            placeholder='Enter a title for your project'
            onChange={(e) => handleInputChange(e, 'project_name')}
          />
        </div>
        <div className='field'>
          <label>Description:</label>
          <textarea
            rows='5'
            type='text'
            id='project-description'
            name='project-description'
            value={inputData.description}
            placeholder='Enter a short description of your project'
            onChange={(e) => handleInputChange(e, 'description')}
          />
        </div>
        <div className='field'>
          <label>Needed Skills:</label>
          <div className='filters'>{checkboxArr}</div>
        </div>
        {/* TODO: fix project submission handler(backend) */}
        <button
          id='create-button'
          type='submit'
        >
          Pitch it!
        </button>
      </form>
    </div>
  );
};

export default Create;
