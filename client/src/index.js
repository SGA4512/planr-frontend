import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import "semantic-ui-css/semantic.min.css";
import 'antd/dist/antd.css';
import './index.scss';
import App from './App';
import axios from 'axios';

// send cookies with requests by default
axios.defaults.withCredentials = true;

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'));
