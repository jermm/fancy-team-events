import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EventList.scss';
import Header from '../Header/header';
import AddEvent from "../../assets/plus.svg";
import {getEventByUser} from "../../services/events";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = { events:[]};
    }

    componentDidMount() {
        this.getEvents();
    }

    async getEvents() {
            try {
                const accessToken = await this.props.auth.getAccessToken();
                const response = await getEventByUser(accessToken);
                this.setState({ events:response.eventsByUser, failed: false });
            } catch (err) {
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
}

export default withAuth(EventList);