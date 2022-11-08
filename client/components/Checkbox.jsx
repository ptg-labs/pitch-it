import React, { useState, useEffect } from 'react';

const Checkbox = ({ skill, handleClick, type }) => {
  const [toggle, setToggle] = useState(false);
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
