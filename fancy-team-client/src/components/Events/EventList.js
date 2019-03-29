import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './EventList.scss';
import Header from '../Header/header';
import AddEvent from "../../assets/plus.svg";

// Test data for events per user
const event = [
    {id: 1, eventDate: "12-10-19", title: "Pinic", isOrganizer: true},
    {id: 2, eventDate: "01-13-20", title: "Happy hour", isOrganizer: false},
    {id: 3, eventDate: "11-10-19", title: "Farewell lunchr", isOrganizer: false},
    {id: 4, eventDate: "07-17-20", title: "Golf @ Shoreline", isOrganizer: true}
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
            try {
                const accessToken = await this.props.auth.getAccessToken();
                console.log(accessToken);
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
    }

    render() {
        return (
            <div className='event-list-page'>
                <div className='event-list-page-header'>
                  <Header />
                </div>
               <div className='event-list-page-create-event'>
                   <div className='event-list-page-add-event'>
                     <Link to="/event/create">
                       <img src={AddEvent} alt="Create Event" className="event-add-icon" width="100" />
                     </Link>
                   </div>
                 {/* {this.state.failed === true && <Message error header="Failed to fetch events." />}
                {this.state.failed === null && <p>Fetching Messages..</p>} */}

                 <div>
                   <table className='table'>
                     <thead>
                     <tr>
                       <th colSpan="2">Events</th>
                     </tr>
                     </thead>
                     <tbody>
                     {this.state.events.map(event =>
                         <tr id={event.id} key={event.id}>
                           <td>{event.eventDate}</td>
                           {event.isOrganizer ? <td><Link to={`/event/edit/${event.id}`}>{event.title}</Link></td> : <td><Link to={`/event/view/${event.id}`}>{event.title}</Link></td>}
                         </tr>)}
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
        );
    }
});
