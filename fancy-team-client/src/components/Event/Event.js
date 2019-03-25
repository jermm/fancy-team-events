import React, {Component} from 'react';
import { EventList } from "./EventList";
import { Link } from 'react-router-dom';

class Event extends Component {
    render () {
        return (
            <div className="Event">
                <EventList />
                <Link to="/event/create">
                    <img src="https://img.icons8.com/color/48/000000/plus.png"></img>
                </Link>
            </div>
        )
    }
}

export default Event;