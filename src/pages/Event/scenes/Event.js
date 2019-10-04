import React, { useState, useEffect, useContext } from "react";
import BudgetItems from "../components/BudgetItems/BudgetItems";
// import { allEvents } from "../../../services/data";
import * as api from "../../../services/api";
import moment from "moment";
import UserContext from "../../../contexts/UserContext";

const Event = props => {
  // const { isAdmin } = useContext(UserContext);

  const [event, setEvent] = useState({ budgetItems: [] });
  const eventId = props.match.params.id;

  useEffect(() => {
    api
      .getEvent(eventId)
      .then(res => {
        setEvent(res.data);
        // console.log(event); // why is this still the same as prior log?
      })
      .catch(err => console.log(err));
  }, [eventId]);

  // console.log(event.budgetItems);

  const startDate = moment(event.start_date).format("MMMM Do, YYYY");
  const endDate = moment(event.end_date).format("MMMM Do, YYYY");

  const deleteEvent = e => {
    e.preventDefault();
    api
      .deleteEvent(eventId)
      .then(_ => {
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  const editEvent = e => {
    e.preventDefault();
    props.history.push(`/editpage/${eventId}`);
  };

  return (
    <div className="event-page-card">
      <h2>{event.name}</h2>
      <div className="event-info-and-buttons">
        <div className="event-info">
          <p>
            <span className="event-descriptor">Description: </span>
            {event.description}
          </p>
          <p>
            <span className="event-descriptor">Date: </span> {startDate} to{" "}
            {endDate}
          </p>
          <p>
            <span className="event-descriptor">Location: </span>{" "}
            {event.location}
          </p>
          <p>
            <span className="event-descriptor">Total Budget: </span>
            <span id="budget"> ${event.budget}</span>
          </p>
        </div>
        <div className="event-buttons-container">
          <button
            className="event-button"
            onClick={editEvent}
            // disabled={!isAdmin()}
          >
            Edit event
          </button>
          <button
            className="event-button"
            onClick={deleteEvent}
            // disabled={!isAdmin()}
          >
            Delete event
          </button>
        </div>
      </div>

      <BudgetItems
        budgetItems={event.budgetItems}
        eventId={eventId}
        budget={event.budget}
      />
    </div>
  );
};

export default Event;
