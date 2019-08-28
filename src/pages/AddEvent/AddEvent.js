import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './AddEvent.scss';

const AddEvent = props => {
  console.log(props);
  const [events, setEvents] = useState([]);

  const [input, setInput] = useState({
    event_title: '',
    event_description: '',
    event_location: '',
    event_start: '',
    event_end: '',
    event_budget: '',
  });

  useEffect(() => {
    // addEvent();
  }, []);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  console.log(input);

  const handleSubmit = e => {
    e.preventDefault();
    // axios.post(http://, input)
    // .then(res => setEvents(res.data))
    // .catch(err => console.log(err))

    props.history.push('/event/:id');

    console.log('the input', input);
    setInput({
      event_title: '',
      event_description: '',
      event_location: '',
      event_start: '',
      event_end: '',
      event_budget: '',
    });
  };

  console.log(input);

  return (
    <div className='formStyles'>
      <form onSubmit={handleSubmit}>
        <h2>Add Event</h2>

        <input
          name='event_title'
          value={input.event_title}
          onChange={handleChange}
          type='text'
          placeholder='Event Title'
        />
        <input
          name='event_description'
          value={input.event_description}
          onChange={handleChange}
          type='text'
          placeholder='Event Description'
        />
        <input
          name='event_location'
          value={input.event_location}
          onChange={handleChange}
          type='text'
          placeholder='Event Location'
        />
        <label>Start date</label>
        <input
          name='event_start'
          value={input.event_start}
          onChange={handleChange}
          type='date'
        />
        <label>End date</label>
        <input
          name='event_end'
          value={input.event_end}
          onChange={handleChange}
          type='date'
        />

        <input
          name='event_budget'
          value={input.event_budget}
          onChange={handleChange}
          type='number'
          placeholder='Total Budget'
        />

        <button>Submit Event</button>
      </form>
    </div>
  );
};
export default AddEvent;
