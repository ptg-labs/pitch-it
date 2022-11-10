import React from 'react';
/*
  Individual Project Card
*/

const Project = (props) => {
  const {
    username,
    project_id,
    title,
    description,
    skills,
    date,
    isOwner,
    handleDelete,
    handleUpdate,
    toggleEditor,
  } = props;
  return (
    <div
      id={`project-${project_id}`}
      className='project-card'
    >
      <div className='title'>
        <b style={{ backgroundColor: 'inherit' }}>{title}</b>
      </div>
      <hr />
      <div>
        <b style={{ backgroundColor: 'inherit' }}>Created By:</b> {username}
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
      {/* 
      isOwner is only true on MyProjects page
      toggleEditor will populate the editor with the clicked project's data
       */}
      {isOwner && (
        <button onClick={() => toggleEditor(props)}>Edit Project</button>
      )}
    </div>
  );
};

export default Project;
