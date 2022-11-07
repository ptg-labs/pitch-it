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
      <div className="title">
        <b style={{ backgroundColor: 'inherit' }}>{title}</b>
      </div>
      <hr />
      <div>
        <b style={{ backgroundColor: 'inherit' }}>Created By:</b> {owner_name}
      </div>
      <div>
        <b style={{ backgroundColor: 'inherit' }}>Description:</b> {description}
      </div>
      <div>
        <b style={{ backgroundColor: 'inherit' }}>Skills needed:</b>{' '}
        {skills.join(', ')}
      </div>
      <div>
        <b style={{ backgroundColor: 'inherit' }}>Date: </b>
        {date}
      </div>
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
