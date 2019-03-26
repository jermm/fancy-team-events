import React from 'react';
import FormInputs from './FormInputs';
import FromSelect from './FormSelect';
import FromTextArea from './FormTextArea';

function CreateEventForm (props) {
  const {
    handleSubmit,
    headerTitle
  } = props;

  return (
      <>
        <h1>{headerTitle}</h1>
      <form onSubmit={handleSubmit} className='CreateEventForm'>
        <div className='createEventForm-SectionA'>
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
          <FromTextArea
              name = 'inviteEmails'
              placeholder = 'Enter Invitee Emails'
              labelText = 'EventInviteeList'
              id = 'EventInviteeList'
              wrapperDivClassName ='create-event-eventInviteeList'
              {...props}
          />
        </div>
        <div className='createEventForm-SectionB'>
          <div>
            <button type='submit' id='createEventForm-Submit-btn'>Submit</button>
          </div>
        </div>
      </form>
      </>
  )
}

export default CreateEventForm;