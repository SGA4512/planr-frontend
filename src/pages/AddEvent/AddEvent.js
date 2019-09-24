import React, { useState, useEffect } from "react";
import * as api from "../../services/api";

const emptyEvent = {
  event_title: "",
  event_description: "",
  event_location: "",
  event_start: "",
  event_end: "",
  event_budget: ""
};

const AddEvent = props => {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState(emptyEvent);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api
      .addEvent(input)
      .then(res => {
        setEvents(res.data);
        props.history.push(`/event/${res.data[0].id}`);
      })
      .catch(err => console.log(err));
    setInput(emptyEvent);
  };

  return (
    <div className="form-container">
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          name="event_title"
          value={input.event_title}
          onChange={handleChange}
          type="text"
        />
        <label>Description</label>
        <input
          name="event_description"
          value={input.event_description}
          onChange={handleChange}
          type="text"
        />
        <label>Location</label>
        <input
          name="event_location"
          value={input.event_location}
          onChange={handleChange}
          type="text"
        />
        <label>Start Date</label>
        <input
          name="event_start"
          value={input.event_start}
          onChange={handleChange}
          type="date"
        />
        <label>End Date</label>
        <input
          name="event_end"
          value={input.event_end}
          onChange={handleChange}
          type="date"
        />
        <label>Total Budget</label>
        <input
          name="event_budget"
          value={input.event_budget}
          onChange={handleChange}
          type="number"
        />
        <button>Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
