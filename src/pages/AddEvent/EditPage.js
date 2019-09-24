import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEvent from "./EditEvent";

const EditPage = props => {
  const eventId = props.match.params.id;

  const [event, setEvent] = useState();

  useEffect(() => {
    axios
      .get(`https://egge-corporate-ep.herokuapp.com/api/events/${eventId}`)
      .then(res => {
        setEvent(res.data);
        console.log(res.data);
      })

      .catch(err => console.log(err));
  }, [eventId]);
  if (!event) {
    return <div style={{ height: "600px" }}>Loading events...</div>;
  }

  return (
    <div>
      <EditEvent event={event} />
    </div>
  );
};

export default EditPage;
