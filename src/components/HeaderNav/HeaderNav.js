import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext.js";

const HeaderNav = props => {
  const { user, setUser, isAdmin } = useContext(UserContext);

  function logout() {
    axios
      .get("https://egge-corporate-ep.herokuapp.com/api/logout")
      .then(response => {
        console.log(response);
        setUser(false);
        props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
      });
  }

  // TESTING CONDITIONAL RENDERING

  const loggedOut = null;

  return (
    <nav className="nav-header-container">
      <div className="nav-name">
        <NavLink to="/">Planr</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/">Your Events</NavLink>
        {/* {isAdmin() ? <NavLink to="/addevent">Create New Event</NavLink> : null} */}
        <NavLink to="/addevent">Create New Event</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        {user && <button onClick={logout}>LOGOUT</button>}
      </div>
    </nav>
  );
};

export default HeaderNav;
