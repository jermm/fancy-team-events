import React, {Component} from 'react';
import {EventList} from "./EventList";

class Event extends Component {
    render () {
        return (
            <div className="Event">
                <EventList />
            </div>
        )
    }
}