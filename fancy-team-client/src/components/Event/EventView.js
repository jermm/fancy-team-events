import React from 'react';
import './event.scss';
import Switch from '../Switch/view';
import Back from "../../assets/back.png";
import {Link} from 'react-router-dom';
import SelectBox from '../Select/view';

function EventInfo(props) {
    const {
        event,
        handleEventInvite,
        isAttending,
        tShirtSize,
        handleSelect
    } = props;

    return (
        <div className='event-form-container'>
            <div>
                <Link to="/event">
                    <img src={Back} alt="Create Event" className='back-icon' width="100"/>
                </Link>
            </div>
            <h1>{event.title}</h1>

            {Object.entries(event).map(([key, value]) =>
                key !== 'id' && key !== 'inviteEmails' && key !== 'locationId' && key !== 'title' ? (
                    <div className='event-field'>
                        <span className='event-field-key'>{key}:</span>
                        <span className='event-field-value'>{value}</span>
                    </div>) : null
            )}

            <div className='event-field'>
                <span className='event-field-key'>Attend Invite</span>
                <span className='event-field-value event-switch'>
                    <Switch isChecked={isAttending} onToggle={handleEventInvite}/></span>
            </div>

            {event.tshirt === 'Yes' ?
                (<div className='event-field'>
                <span className='event-field-key'>Tshirt size:</span>
                <span className='event-field-value event-select'>
                   <SelectBox
                       options={['','Large', 'Medium', 'Small']}
                       value={tShirtSize}
                       onSelect={handleSelect}
                   /></span>
            </div>) :null
            }
        </div>

    )
}

export default EventInfo;

