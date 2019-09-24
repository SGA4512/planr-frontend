import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EditEvent from './EditEvent'

// import './AddEvent.scss'

const AddEvent = props => {
  console.log(props)
  const [events, setEvents] = useState([])

  const [input, setInput] = useState({
    event_title: '',
    event_description: '',
    event_location: '',
    event_start: '',
    event_end: '',
    event_budget: '',
    
  })

  useEffect(() => {
    axios
      .get(`https://egge-corporate-ep.herokuapp.com/api/events/`)

      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  console.log(input)

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(`https://egge-corporate-ep.herokuapp.com/api/events`, input)

      .then(res => setEvents(res.data))
      .catch(err => console.log(err))

    // props.history.push('/event/1');

    console.log('the input', input)
    setInput({
      event_title: '',
      event_description: '',
      event_location: '',
      event_start: '',
      event_end: '',
      event_budget: ''
    })
  }

  console.log(input)

  return (
    <div className='formStyles'>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Title</label>
        <input
          name='event_title'
          value={input.event_title}
          onChange={handleChange}
          type='text'
        />
        <label>Event Description</label>
        <input
          name='event_description'
          value={input.event_description}
          onChange={handleChange}
          type='text'
        />
        <label>Event Location</label>
        <input
          name='event_location'
          value={input.event_location}
          onChange={handleChange}
          type='text'
        />
        <label>Start date</label>
        <input
          name='event_start'
          value={input.event_start}
          onChange={handleChange}
          type='date'
        />
        <label>End date</label>
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

        <button>Submit Event</button>
      </form>
      {events.map(event => (
        <EditEvent event={event} setEvents={setEvents} />
      ))}
    </div>
  )
}
export default AddEvent
