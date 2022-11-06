import React, { useState, useEffect } from 'react';

const Checkbox = ({ skill, handleClick }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button
        style={{ backgroundColor: toggle ? '#FFF' : 'lightblue' }}
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
