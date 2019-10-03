import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext.js";

const HeaderNav = props => {
  const { user, setUser, isAdmin } = useContext(UserContext);

  // if using cookies/sessions on backend
  // const logout = () => {
  //   api
  //     .logout()
  //     .then(response => {
  //       console.log(response);
  //       setUser(false);
  //       props.history.push("/login");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
    props.history.push("/login");
  };

  return (
    <nav className="nav-header-container">
      <div className="nav-name">
        <NavLink to="/">Planr</NavLink>
      </div>
      <div className="nav-links">
        {/* {!user ? (
          <> */}
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Sign in</NavLink>
        {/* </>
        ) : (
          <> */}
        <NavLink to="/">Your Events</NavLink>
        {/* {isAdmin() ? <NavLink to="/addevent">Create Event</NavLink> : null} */}
        <NavLink to="/addevent">Create Event</NavLink>
        <button onClick={logout}>Sign out</button>
        {/* </>
        )} */}
      </div>
    </nav>
  );
};

export default HeaderNav;
