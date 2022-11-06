import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
  Create button needs:
  onClick reroute, OR modal popup
  Project name -> submit field
  Description -> submit field
  Skills needed -> prepopulated skills
  Time stamp -> Date.now
*/

const Create = () => {
  const defaultInput = {
    project_name: '',
    description: '',
    skillset: '',
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
    const date = new Date();
    inputData.date = date.toDateString();
    inputData.owner_id = localStorage.getItem('user_id');
    inputData.owner_name = localStorage.getItem('username');
    if (
      !inputData.project_name ||
      !inputData.description ||
      !inputData.skillset
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
        console.log('catch block');
        setDuplicate(true);
      }
    })();
  };
  return (
    <div>
      <form id='project-creation-form' onSubmit={handleSubmit}>
        <h1>Project Creation!</h1>
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
          <input
            type='text'
            id='project-description'
            name='project-description'
            value={inputData.description}
            placeholder='Enter a short description of your project'
            onChange={(e) => handleInputChange(e, 'description')}
          />
        </div>
        <div className='field'>
          <label>Skillsets Needed:</label>
          <input
            type='text'
            id='skillsets-needed'
            name='skillsets-needed'
            value={inputData.skillset}
            placeholder='Enter a description of the Teammates you would like to find!'
            onChange={(e) => handleInputChange(e, 'skillset')}
          />
        </div>
        <button type='submit'>Create Project</button>
      </form>
    </div>
  );
};

export default Create;
