import React from 'react';
import './event.scss';
import Switch from '../Switch/view';


function EventInfo(props) {
    const {
        event,
        handleEventInvite,
        isAttending
    } = props;

    return (
        <div className='event-form-container'>
            <h1>{event.title}</h1>

            {Object.entries(event).map(([key,value]) =>
               key !== 'id' && key !== 'inviteEmails' && key !== 'title' ? (
            <div className='event-field'>
                    <span className='event-field-key'>{key}:</span>
                    <span className='event-field-value'>{value}</span>
                </div>):null
            )}

            <div className='event-field'>
                <span className='event-field-key'>Attend Invite</span>
                <span className='event-field-value event-switch'>
                    <Switch isChecked={isAttending} onToggle={handleEventInvite}/></span>
            </div>
        </div>

    )
}

export default EventInfo;

