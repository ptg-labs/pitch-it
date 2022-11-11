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
        {title}
        <div className='username'>{username}</div>
      </div>
      <div>Description: {description}</div>
      <div>Skills needed: {skills.join(', ')}</div>
      <div>Date: {date}</div>
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
