import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './AddEvent.scss'

const EditEvent = props => {
  const {
    event_title,
    event_description,
    event_location,
    event_start,
    event_end,
    event_budget,
    id
  } = props.event

  const [editToggle, setEditToggle] = useState(false)

  const [input, setInput] = useState({
    event_title: event_title,
    event_description: event_description,
    event_location: event_location,
    event_start: event_start,
    event_end: event_end,
    event_budget: event_budget
  })

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleToggle = () => setEditToggle(!editToggle)

  const handleDelete = () => {
    axios
      .delete(`https://egge-corporate-ep.herokuapp.com/api/events/${id}`)
      .then(res => props.setEvents(res.data))
      .catch(err => console.log(err))
  }

  const handleEdit = e => {
    e.preventDefault()
    axios
      .put(`https://egge-corporate-ep.herokuapp.com/api/events/${id}`, input)
      .then(res => props.setEvents(res.data))
      .catch(err => console.log(err))
    setEditToggle(false)
  }

  // const handleClick = () => {
  //   props.history.push('/event/1')
  // }

  return (
    <div className='formStyles'>
      {editToggle ? (
        <div>
          <form onSubmit={handleEdit}>
            <h2>Edit Event</h2>

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

            <input
              name='event_end'
              value={input.event_end}
              onChange={handleChange}
              type='date'
            />

            <label>Total Budget</label>
            <input
              name='event_budget'
              value={input.event_budget}
              onChange={handleChange}
              type='number'
            />
            <button>Update Event</button>
          </form>
          <button onClick={handleToggle}>Back</button>
        </div>
      ) : (
        <div>
          <h1>Event Summary</h1>
          <h2>Title: {event_title}</h2>
          <h3>Description: {event_description}</h3>
          <h3>Location: {event_location}</h3>
          <h3>Start Date: {event_start}</h3>
          <h3>End Date: {event_end}</h3>
          <h3>Total Budget: {event_budget}</h3>
          <div>
            <button onClick={handleDelete}>delete</button>
            <button onClick={handleToggle}>edit</button>
          </div>
          <h3>If Satisfied with Event Summary proceed to Event Listing</h3>

          <Link to={'/'}>
            <button>Event Listing</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default EditEvent
