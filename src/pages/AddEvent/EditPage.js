import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEvent from "./EditEvent";
import * as api from "../../services/api";

const EditPage = props => {
  const eventId = props.match.params.id;

  const [event, setEvent] = useState();

  useEffect(() => {
    api
      .getEvent(eventId)
      .then(res => {
        setEvent(res.data);
      })
      .catch(err => console.log(err));
  }, [eventId]);

  if (!event) {
    return <div style={{ height: "600px" }}>Loading event...</div>;
  }

  return (
    <div>
      <EditEvent {...props} event={event} />
    </div>
  );
};

export default EditPage;
