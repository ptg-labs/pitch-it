import React from 'react';
import '../styles/project-cards.scss';
/*
  Individual Project Card
*/

const Project = ({
  owner_name,
  project_id,
  title,
  description,
  skills,
  date,
  handleDelete,
}) => {
  return (
    <div
      id={`project-${project_id}`}
      className="project-card"
    >
      <div>Project Title: {title}</div>
      <div>Created By: {owner_name}</div>
      <div>Description: {description}</div>
      <div>Skills needed: {skills.join(', ')}</div>
      <div>Date: {date}</div>
      {/* Conditionally render in the delete button*/}
      {/* Maybe even stretch this functionality to trigger if an edit button is clicked? */}
      {handleDelete && (
        <button
          className="delete-button"
          onClick={() => {
            handleDelete(project_id);
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Project;
