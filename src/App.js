import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import RegisterForm from "./pages/Register/index";
import EventsList from "./pages/EventsList/scenes/EventsList";
import AddEvent from "./pages/AddEvent/AddEvent";
import EditPage from "./pages/AddEvent/EditPage";
import Event from "./pages/Event/scenes/Event";
import LoginForm from "./pages/Login/LoginForm";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import Footer from "./components/Footer";
import UserContext from "./contexts/UserContext";
import { refresh } from "./services/api";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
