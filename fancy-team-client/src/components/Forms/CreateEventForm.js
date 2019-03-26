import React from 'react';
import FormInputs from './FormInputs';
import FromSelect from './FormSelect';

function CreateEventForm (props) {
  const {
    handleSubmit,
  } = props;

  return (
      <form onSubmit={handleSubmit}>
        <FromSelect
            name ='eventType'
            options = {['SelectEvent', 'TeamOuting', 'FareWell']}
            className = 'create-event-select'
            id ='EventType'
            labelName ='EventType'
            {...props}
        />
        <FormInputs
            type = 'text'
            name = 'location'
            placeholder = 'location*'
            labelText = 'Location'
            id = 'Location'
            wrapperDivClassName ='create-event-location'
            {...props}
        />
        <FormInputs
            type = 'text'
            name = 'email'
            placeholder = 'email*'
            labelText = 'Email'
            id = 'Email'
            wrapperDivClassName ='create-event-email'
            {...props}
        />
        <FormInputs
            type = 'date'
            name = 'eventDate'
            placeholder = ''
            labelText = 'EventDate'
            id = 'EventDate'
            wrapperDivClassName ='create-event-eventDate'
            {...props}
        />
        <FormInputs
            type = 'time'
            name = 'eventstart'
            placeholder = ''
            labelText = 'EventStartTime'
            id = 'EventStartTime'
            wrapperDivClassName ='create-event-eventStartTime'
            {...props}
        />
        <FormInputs
            type = 'time'
            name = 'eventend'
            placeholder = ''
            labelText = 'EventEndTime'
            id = 'EventEndTime'
            wrapperDivClassName ='create-event-eventEndTime'
            {...props}
        />
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
  )
}

export default CreateEventForm;