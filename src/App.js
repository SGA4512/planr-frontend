import React from 'react';
import { Route } from 'react-router-dom';
import EventsList from './pages/EventsList/scenes/EventsList';
import Register from './pages/Register';
import AddEvent from './pages/AddEvent/AddEvent';

// import LoginForm from './pages/Login/index';
import Event from './pages/Event/scenes/Event';

function App() {
  return (
    <div className='App'>
      <h1>Corporate Event Planner</h1>
      <Route exact path='/' component={EventsList} />
      {/* <Route path="/login" component={LoginForm} /> */}
      <Route path='/register' component={Register} />
      <Route path='/event/:id' component={Event} />
      <Route path='/addevent' component={AddEvent} />
    
    </div>
  );
}

export default App;
