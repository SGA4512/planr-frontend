import React, { useState } from "react";
import * as api from "../../services/api";

const EditEvent = props => {
  console.log("edit event props", props);
  const {
    name,
    description,
    location,
    start_date,
    end_date,
    budget,
    id
  } = props.event;

  const [input, setInput] = useState({
    name,
    description,
    location,
    start_date,
    end_date,
    budget
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
      .then(res => {
        console.log(res);
        props.history.push(`/event/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleEdit}>
        <h1>Edit Event</h1>
        <label>
          Event name
          <input
            name="name"
            value={input.name}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          Description
          <input
            name="description"
            value={input.description}
            onChange={handleChange}
            type="text"
            placeholder="Event Description"
          />
        </label>
        <label>
          Location
          <input
            name="location"
            value={input.location}
            onChange={handleChange}
            type="text"
            placeholder="Event Location"
          />
        </label>
        <label>
          Start date
          <input
            name="start_date"
            value={input.start_date}
            onChange={handleChange}
            type="date"
          />
        </label>

        <label>
          End date
          <input
            name="end_date"
            value={input.end_date}
            onChange={handleChange}
            type="date"
          />
        </label>
        <label>
          Total Budget
          <input
            name="budget"
            value={input.budget}
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
