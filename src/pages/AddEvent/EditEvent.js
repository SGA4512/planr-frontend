import React, { useState, useEffect } from "react";
import axios from "axios";
import * as api from "../../services/api";

const EditEvent = props => {
  const {
    event_title,
    event_description,
    event_location,
    event_start,
    event_end,
    event_budget,
    id
  } = props.event;

  const [input, setInput] = useState({
    event_title,
    event_description,
    event_location,
    event_start,
    event_end,
    event_budget
  });

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = e => {
    e.preventDefault();
    api
      .editEvent(id, input)
      // axios
      //   .put(`https://egge-corporate-ep.herokuapp.com/api/events/${id}`, input)
      .then(res => {
        props.setEvents(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleEdit}>
        <h2>Edit Event</h2>
        <label>
          Event name
          <input
            name="event_title"
            value={input.event_title}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          Description
          <input
            name="event_description"
            value={input.event_description}
            onChange={handleChange}
            type="text"
            placeholder="Event Description"
          />
        </label>
        <label>
          Location
          <input
            name="event_location"
            value={input.event_location}
            onChange={handleChange}
            type="text"
            placeholder="Event Location"
          />
        </label>
        <label>
          Start date
          <input
            name="event_start"
            value={input.event_start}
            onChange={handleChange}
            type="date"
          />
        </label>

        <label>
          End date
          <input
            name="event_end"
            value={input.event_end}
            onChange={handleChange}
            type="date"
          />
        </label>
        <label>
          Total Budget
          <input
            name="event_budget"
            value={input.event_budget}
            onChange={handleChange}
            type="number"
          />
        </label>
        <button onClick={handleEdit}>Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
