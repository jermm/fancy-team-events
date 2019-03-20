import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">

                {/* list of events from back end*/}
                {/*new comp -> event list*/}
                {/*question -> how to handle user -> */}

                {/* "login", "upsert" user entry, nav */}
                <p>Username: <input type="text" /></p>
                <p>Email: <input type="email" /></p>
                <button>Login</button>


                {/* sorted newest to oldest (newest on top) */}
                <ul>
                    {/* potentially -> list item level*/}
                    {/* pick how much data to show*/}
                    <li>my first event | time (is in 2 hours?)</li>
                    {/*on click you go to /eventId/userId?*/}
                    <li>my 2nd event | whatever info we want </li>
                </ul>

                {/*if no events*/}
                <p> Why don't you make an event?<img className="smallImg" src="fancy_img.jpg"/></p>
                <button>Make new event</button>
                {/*take you to create event page to / */}


                <h1>create a new event!</h1>
                <EventName callback={(event) => {console.log(event.target.value)}} placeholderForEntry="fancy party" />
                <p>When is it? <input type="date"/></p>
                <p>What time is it? <input type="time"/></p>
                <p>When does it end?  <input type="time"/></p>
                <p>Where is it? <input type="text" /></p>
                <p>What should people know? <input type="text"/></p>
                <p>When's the deadline? <input type="date"/> <input type="time"/></p>
            </div>
        );
    }
}

class EventName extends Component {

    
    render() {
        return (
            <p>Name your event: <input type="text" onChange={this.props.callback} placeholder={this.props.placeholderForEntry} /></p>
        )
    }

}

export default App;
