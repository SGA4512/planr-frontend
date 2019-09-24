import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { allEvents } from "../../../services/data";
import { getEvents } from "../../../services/api";
import moment from "moment";
import { Timeline } from "antd";

const EventsList = props => {
  // console.log(allEvents)
  const [eventsList, setEventsList] = useState(null);
  const [searchText, setSearchText] = useState("");
  // filtered event list var

  const handleSearch = e => {
    setSearchText(e.target.value); // on next rerender
    // console.log(searchText);
  };

  useEffect(() => {
    getEvents()
      .then(res => {
        // console.log(res.data);
        setEventsList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //     console.log(searchText)
  //     let searchMatches = eventsList.filter(event => event.name.toLowerCase().includes(searchText.toLowerCase()))
  //     // fuzzy matching with JS library (fuseJS)
  //     setEventsList(searchMatches)
  // }, [searchText])

  if (!eventsList) {
    return <div style={{ height: "600px" }}>Loading events...</div>;
  }

  // const sortEvents = () => {
  //   const sortedEvents = eventsList;
  //   console.log(sortedEvents);
  //   sortedEvents.sort((a, b) => {
  //     let c = new Date(a.event_start);
  //     let d = new Date(b.event_start);
  //     return c - d;
  //   });
  //   console.log(sortedEvents);
  //   setEventsList(sortedEvents);
  // };

  return (
    <div className="events-list">
      <h2>Upcoming events</h2>
      {/* <button onClick={sortEvents}>SORT</button> */}
      <form>
        <input
          type="text"
          value={searchText}
          placeholder="Search by event name"
          onChange={handleSearch}
        />
      </form>
      <div className="events-container">
        <Timeline mode="alternate">
          {eventsList
            .filter(event =>
              event.event_title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map(event => {
              const startDate = moment(event.event_start).format(
                "MMMM Do, YYYY"
              );
              const endDate = moment(event.event_end).format("MMMM Do, YYYY");
              const relativeDate = moment(event.event_start).fromNow();

              return (
                <Timeline.Item>
                  <div className="event-card">
                    <p className="relative-date">{relativeDate}</p>
                    <h3>{event.event_title}</h3>
                    <p>Budget: ${event.event_budget}</p>
                    <p>
                      <span>{startDate}</span> through <span>{endDate}</span>
                    </p>
                    <p>Location: {event.event_location}</p>
                    <Link
                      to={`/event/${event.id}`}
                      className="view-event-button"
                    >
                      View Event
                    </Link>
                  </div>
                </Timeline.Item>
              );
            })}
        </Timeline>
      </div>
    </div>
  );
};

export default EventsList;
