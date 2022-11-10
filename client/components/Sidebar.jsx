import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/sidebar.scss';
import Logo from './Logo.jsx';

// route to different pages (components) by using react router 
const Sidebar = () => {
  return (
    // aside container to hold links and Logo
    <aside className='aside'>
      <div className='aside-wrapper'>
        <Link
          to={'/home'}
          id='logo-section'
        >
          <span
            id='logo'
            className='navbuttons'
          >
            <Logo />
          </span>
        </Link>
        <ul className='side-link'>
          <li key={1}>
            <Link
              to={'/myprojects'}
              className='navbuttons'
            >
              My Pitches
            </Link>
          </li>
          <li>
            <Link
              to={'/Favorites'}
              className='navbuttons'
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to={'/Settings'}
              className='navbuttons'
            >
              Settings
            </Link>
          </li>
          { }
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
