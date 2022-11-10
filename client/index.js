import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import styles from './styles/styles.scss';
// use React 18 to render application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
