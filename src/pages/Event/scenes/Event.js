import React, { useState, useEffect, useContext } from "react";
import ShoppingList from "../components/ShoppingList/ShoppingList";
import { allEvents } from "../../../services/data";
import * as api from "../../../services/api";
import moment from "moment";
import UserContext from "../../../contexts/UserContext";

// conditional rendering based on localStorage key (set buttons to active/inactive)
// axiosWithAuth GET event info

const Event = props => {
  const { user, setUser, isAdmin } = useContext(UserContext);

  // Uncomment to use dummy data instead of API endpoints
  // const { eventId } = props.match.params.id;
  // const [event, setEvent] = useState(allEvents[props.match.params.id - 1]); // hard coded to work with dummy array

  // Comment out to use dummy dummy instead API endpoints
  const [event, setEvent] = useState({ items: [] });
  const eventId = props.match.params.id;
  // console.log("EVENT ID", eventId);
  useEffect(() => {
    api
      .getEvent(eventId)
      .then(res => {
        // console.log("GET", res.data);
        setEvent(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const startDate = moment(event.event_start).format("MMMM Do, YYYY");
  const endDate = moment(event.event_end).format("MMMM Do, YYYY");
  const timeTilEvent = moment(event.event_start).fromNow();

  // console.log(timeTilEvent);

  const deleteEvent = e => {
    e.preventDefault();
    api
      .deleteEvent(eventId)
      .then(res => {
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
      <h2>{event.event_title}</h2>
      <div className="event-info-and-buttons">
        <div className="event-info">
          <p>
            <span>Description: </span>
            {event.event_description}
          </p>
          <p>
            <span>Date: </span> {startDate} to {endDate}
          </p>
          <p>
            <span>Location: </span> {event.event_location}
          </p>
          <p>
            <span>Total Budget: </span>
            <span id="budget">${event.event_budget}</span>
          </p>
        </div>
        <div className="event-buttons-container">
          <button
            className="event-button"
            onClick={editEvent}
            disabled={!isAdmin()}
          >
            Edit event
          </button>
          <button
            className="event-button"
            onClick={deleteEvent}
            disabled={!isAdmin()}
          >
            Delete event
          </button>
        </div>
      </div>

      <ShoppingList
        shoppingList={event.items}
        eventId={eventId}
        budget={event.event_budget}
      />
      {/* <ShoppingList
        shoppingList={event.shopping_list}
        budget={event.event_budget}
      /> */}
    </div>
  );
};

export default Event;
