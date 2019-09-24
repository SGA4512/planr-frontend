import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import HeaderNav from "./components/HeaderNav/HeaderNav";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import EventsList from "./pages/EventsList/scenes/EventsList";
import AddEvent from "./pages/AddEvent/AddEvent";
import EditPage from "./pages/AddEvent/EditPage";
import Event from "./pages/Event/scenes/Event";

import UserContext from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { refresh } from "./services/api";

function App() {
  const [user, setUser] = useState({});

  const isAdmin = () => {
    return user && [1, 2].includes(user.role_id);
  };

  useEffect(() => {
    refresh()
      .then(res => {
        setUser(res.data[0]);
      })
      .catch(err => {
        setUser(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin }}>
      <div>
        <Route path="/" component={HeaderNav} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <ProtectedRoute exact path="/" component={EventsList} />
        <ProtectedRoute path="/event/:id" component={Event} />
        <ProtectedRoute path="/addevent" component={AddEvent} />
        <ProtectedRoute path="/editpage/:id" component={EditPage} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
