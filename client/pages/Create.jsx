import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox.jsx';
import '../styles/create.scss';

/*
  Create button needs:
  onClick reroute, OR modal popup
  Project name -> submit field
  Description -> submit field
  Skills needed -> prepopulated skills
  Time stamp -> Date.now
*/

const Create = () => {
  // this object contains all the skills and initializes their clickState to false
  // TODO: STASH skillsObj IN A SEPARATE AND IMPORT WHERE NEEDED
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
  }
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
    // Populate inputData with required fields
    const filteredSkills = [];
    // We are going to push the index of the truthy skills into an array, which we will send in a request to our backend
    for (const skill in skillState) {
      // If we read a truthy value in our skillState object
      if (skillState[skill])
        // push the index to the filteredSkills array
        // SQL indicies start at 1 so we should add 1 to each value
        filteredSkills.push(Object.keys(skillsObj).indexOf(skill) + 2);
    }
    // TODO: don't mutate state directly
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
    // Send an asynchronous post request to our server
    (async function postProject() {
      try {
        const postProjectStatus = await axios.post(
          'http://localhost:3000/projects/',
          inputData
        );
        if (postProjectStatus) {
          setDuplicate(false);
          setValid(true);
          setInputData(defaultInput);
          return navigate('/myprojects');
        }
      } catch (err) {
        // TODO: FIX ERROR HANDLER TO NOT SET DUPLICATE FOR ANY ERROR
        console.log('catch block');
        setDuplicate(true);
      }
    })();
  };
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
          {/* <input
            type='text'
            id='skillsets-needed'
            name='skillsets-needed'
            value={inputData.skillset}
            placeholder='Enter a description of the Teammates you would like to find!'
            onChange={(e) => handleInputChange(e, 'skillset')}
          /> */}
          <div className='filters'>{checkboxArr}</div>
        </div>
        {/* TODO: FIX PROJECT SUBMISSION HANDLER (BACKEND?) */}
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
