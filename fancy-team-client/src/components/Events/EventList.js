import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './EventList.scss';
import Event from './Event';
import EventLogo from "./calendar-events-svgrepo-com.svg";

const event = [
    {id: 1, eventDate: "12-10-19", title: "Pinic"},
    {id: 2, eventDate: "01-13-20", title: "Happy hour"}
];

export default withAuth(class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = { events: event, failed: null};
    }

    componentDidMount() {
        this.getEvents();
    }

    async getEvents() {
        if (!this.state.events) {
            try {
                const accessToken = await this.props.auth.getAccessToken();
                /* global fetch */
                const response = await fetch(config.resourceServer.eventsUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status !== 200) {
                    this.setState({ failed: true });
                    return;
                }

                // let index = 0;
                // const data = await response.json();
                // const events = data.events.map((event) => {
                //     const date = new Date(event.date);
                //     const day = date.toLocaleDateString();
                //     const time = date.toLocaleTimeString();
                //     index += 1;
                //     return {
                //         date: `${day} ${time}`,
                //         text: event.text,
                //         id: `event-${index}`,
                //     };
                // });
                // this.setState({ events, failed: false });
            } catch (err) {
                this.setState({ failed: true });
                /* eslint-disable no-console */
                console.error(err);
            }
        } this.setState({ event });
    }

    render() {
        return (
            <div>
                <header className="event-header">
                    <img src={EventLogo} className="event-logo" width="200" height="300" />
                    <h1 className='event-title'>Fancy Event Organizer</h1>
                </header>
                
                <Link to="/event/create">
                    <img src="https://img.icons8.com/color/48/000000/plus.png"></img>
                </Link>
                {/* {this.state.failed === true && <Message error header="Failed to fetch events." />}
                {this.state.failed === null && <p>Fetching Messages..</p>} */}
                
                <div>
                    <p>This component makes a GET request to the backend graphql server which must be running at <code>localhost:4000/graphql</code></p>
                    
                    <table className='table'>
                        <thead>
                        <tr>
                            <th colspan="2">Events</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.events.map(event => <tr id={event.id} key={event.id}><td>{event.eventDate}</td><td>{event.title}</td></tr>)}
                        {/* {this.state.events.map(event => <tr id={event.id} key={event.id}><td>{event.eventDate}</td><td>{event.description}</td></tr>)} */}
                        {/* <tr>
                            <td>5-13-19</td>
                            <td><Link to="/event/edit">Bowling after work</Link></td>
                        </tr>
                        <tr>
                            <td>6-18-19</td>
                            <td><Link to="/event/view">Happy Hour</Link></td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
                <Event event="Dinner" />
            </div>
        );
    }
});
