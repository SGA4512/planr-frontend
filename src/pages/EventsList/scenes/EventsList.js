import React, { useState, useEffect } from 'react'
import Event from '../../Event/scenes/Event'
import { Link } from 'react-router-dom'
import { allEvents } from '../../../services/data'

const EventsList = (props) => {
    // console.log(allEvents)
    const [eventsList, setEventsList] = useState(allEvents)
    const [searchText, setSearchText] = useState("")
    // filtered event list var

    const handleSearch = e => {
        setSearchText(e.target.value) // on next rerender
        console.log(searchText)
    }

    // useEffect(() => {
    //     console.log(searchText)
    //     let searchMatches = eventsList.filter(event => event.name.toLowerCase().includes(searchText.toLowerCase()))
    //     // fuzzy matching with JS library (fuseJS)
    //     setEventsList(searchMatches)
    // }, [searchText])

    return (
        <div>
            <h2>Upcoming events</h2>
            <form>
                <label> Search by name
                    <input
                        value={searchText}
                        placeholder="Holiday party"
                        onChange={handleSearch}
                    />
                </label>
            </form>
            {eventsList.filter(event => event.name.toLowerCase().includes(searchText.toLowerCase())).map(event => (
                <div>
                    <h3>{event.name}</h3>
                    <p>Budget: ${event.total_budget}</p>
                    <p>From <span>{event.event_start}</span> to <span>{event.event_end}</span></p>
                    <p>{event.location.street}</p>
                    <Link to={`/event/${event.id}`}>
                        View Event
                    </Link>
                    <hr></hr>
                </div>
            )
            )}
        </div>
    )
}

export default EventsList
