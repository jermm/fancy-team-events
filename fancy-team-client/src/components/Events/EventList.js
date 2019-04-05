import React from 'react';
import './EventList.scss';
import AddEvent from "../../assets/plus.svg";
import deleteEvent from "../../assets/delete.png";
import {Link} from 'react-router-dom';
import editEvent from "../../assets/edit.png";
import viewEvent from "../../assets/eye.png";


function EventList(props){
    const {events} = props;

        return (
               <div className='event-list-page-create-event'>
                   <div className='event-list-page-add-event'>
                       <span>My Events</span>
                     <Link to="/event/create">
                       <img src={AddEvent} alt="Create Event" className="event-add-icon" width="100" />
                     </Link>
                   </div>
                 <div>
                   <table className='event-table'>
                       <thead>
                     <tr>
                         <th>EventDate</th>
                         <th>Title</th>
                         <th>Actions</th>
                     </tr>
                       </thead>
                     <tbody>
                     {events.map((event, index) =>
                         <tr id={event.id} key={index}>
                           <td>{event.eventDate}</td>
                             <td>{event.title}</td>
                            <td className="icons">
                                <Link key={index + 1} to={`/event/view/${event.id}`}>
                                    <img src={viewEvent} alt="View Event" className="event-add-icon" width="100" />
                                </Link>
                                {event.isOrganizer ? (
                               <Link key={index + 2} to={`/event/edit/${event.id}`}>
                                    <img src={editEvent} alt="Edit Event" className="event-add-icon" width="100" />
                                </Link> ) : null}
                            </td>
                         </tr>)}
                     </tbody>
                   </table>
                 </div>
               </div>
        );
}

export default EventList;
