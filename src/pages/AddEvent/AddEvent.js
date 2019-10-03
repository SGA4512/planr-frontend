import React, { useState, useEffect } from "react";
import * as api from "../../services/api";

const emptyEvent = {
  name: "",
  description: "",
  location: "",
  start_date: "",
  end_date: "",
  budget: ""
};

const AddEvent = props => {
  const [input, setInput] = useState(emptyEvent);

  const handleChange = e => {
    setInput({
      ...input,
      created_by: Number(localStorage.getItem("user_id")),
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api
      .addEvent(input)
      .then(res => {
        props.history.push(`/event/${res.data.id}`);
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
          name="name"
          value={input.name}
          onChange={handleChange}
          type="text"
        />
        <label>Description</label>
        <input
          name="description"
          value={input.description}
          onChange={handleChange}
          type="text"
        />
        <label>Location</label>
        <input
          name="location"
          value={input.location}
          onChange={handleChange}
          type="text"
        />
        <label>Start Date</label>
        <input
          name="start_date"
          value={input.start_date}
          onChange={handleChange}
          type="date"
        />
        <label>End Date</label>
        <input
          name="end_date"
          value={input.end_date}
          onChange={handleChange}
          type="date"
        />
        <label>Total Budget</label>
        <input
          name="budget"
          value={input.budget}
          onChange={handleChange}
          type="number"
        />
        <button>Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
