import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
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
