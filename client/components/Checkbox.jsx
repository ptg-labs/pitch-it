import React, { useState, useEffect } from 'react';
// TODO: Lift state out of the checkboxes (have the state in the parent component)
// checkbox is a list of buttons that render all the skills and change the state when they are clicked
const Checkbox = ({ skill, handleClick, type }) => {
  // TODO: check if type is necessary 
  const [toggle, setToggle] = useState(false);
  // toggle will alter state back and forth and change color
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button
        className="skill-button"
        type={type}
        style={{
          backgroundColor: toggle ? 'rgb(87, 82, 212)' : '#b6b7cb',
          color: toggle ? 'whitesmoke' : 'black',
        }}
        id={skill}
        name={skill}
        onClick={() => {
          handleToggle();
          handleClick(skill);
        }}
      >
        {skill}
      </button>
    </div>
  );
};

export default Checkbox;
