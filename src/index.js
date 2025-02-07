import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.scss";
import App from "./App";

// send cookies with requests by default
// axios.defaults.withCredentials = true; // BREAKS WHEN NOT USING COOKIES

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
