import React from 'react'

/*
  Create button needs:
  onClick reroute, OR modal popup
  Project name -> submit field
  Description -> submit field
  Skills needed -> prepopulated skills
  Time stamp -> Date.now
*/

const Create = () => {
  return (
    <div>
    <form id="project-creation-form">
    <h1>Project Creation!</h1>
    <div class="field">
      <label for="project-title">Project Title:</label>
      <input type="text" id="project-title" name="project-title" placeholder="Enter a title for your project" />
    </div>
    <div class="field">
      <label for="email">Description:</label>
      <input type="text" id="project-description" name="project-description" placeholder="Enter a short description of your project" />
    </div>
    <div class="field">
      <label for="email">Skillsets Needed:</label>
      <input type="text" id="skillsets-needed" name="skillsets-needed" placeholder="Enter a description of the Teammates you would like to find!" />
    </div>
    <button type="submit">Create Project</button>
  </form>
  </div>
  )
}

export default Create