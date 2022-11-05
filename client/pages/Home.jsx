import React from 'react';
import Project from '../components/Project.jsx';

// ! do we want the Home component to be a component? Or do we want it to be its own page?
/* 
  What do we need from Home component?
  Header component
  Sidebar component
  Filter buttton (dropdown)
  Project Card components
*/

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <div>
        <button id="username">Hao</button>
      </div>
      <div><Project/></div>
    </div>
  );
};

export default Home;
