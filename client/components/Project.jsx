import React from 'react';

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
}) => {
  return (
    <div id={`project-${project_id}`} className='project-card'>
      <div>Project Title: {title}</div>
      <div>Created By: {owner_name}</div>
      {/* <div>Project ID: {project_id}</div> */}
      <div>Description: {description}</div>
      <div>Skills needed: {skills}</div>
      <div>Date: {date}</div>
    </div>
  );
};

export default Project;
