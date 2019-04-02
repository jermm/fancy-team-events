import React from 'react';


function EventView(props) {
    const {
        event
    } = props;

    return (
        <div className='event-form-container'>
            <h1>{event.title}</h1>

            {Object.entries(event).map(([key,value]) =>
                <div className='event-field'>
                    <span className='event-field-key'>{key}:</span>:
                    <span className='event-field-value'>{value}</span>
                </div>
            )}
        </div>

    )
}

export default EventView;

