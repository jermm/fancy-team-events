import React from 'react';
import FormInputs from './FormInputs';
import FromSelect from './FormSelect';
import FromTextArea from './FormTextArea';
import Search from '../Maps/view';
function CreateEventForm (props) {
  const {
    handleSubmit,
    headerTitle
  } = props;

  return (
      <div className='create-event-form-container'>
        <h1>{headerTitle}</h1>
      <form onSubmit={handleSubmit} className='create-event-form'>
          <FormInputs
              type = 'text'
              name = 'eventname'
              placeholder = 'eventname*'
              labelText = 'EventName'
              id = 'Name'
              wrapperDivClassName ='create-event-eventName'
              {...props}
          />
          <FromSelect
              name ='eventType'
              options = {['SelectEvent', 'TeamOuting', 'FareWell']}
              className = 'create-event-select'
              id ='EventType'
              labelName ='EventType'
              {...props}
          />
          <div className='event-Date-Time'>
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
          </div>
          <Search {...props}/>
          <FromTextArea
              name = 'inviteEmails'
              placeholder = 'Enter Invitee Emails'
              labelText = 'EventInviteeList'
              id = 'EventInviteeList'
              wrapperDivClassName ='create-event-eventInviteeList'
              {...props}
          />
        <div className='create-event-form-search'>
          <FromSelect
              name ='tshirt'
              options = {['No', 'Yes']}
              className = 'tshirt'
              id ='Tshirt'
              labelName ='Tshirt'
              {...props}
          />
          <FromTextArea
              name = 'description'
              placeholder = 'Description'
              labelText = 'Description'
              id = 'Description'
              wrapperDivClassName ='create-event-description'
              {...props}
          />

        </div>
          <div>
            <button type='submit' id='createEventForm-Submit-btn'>Submit</button>
          </div>
      </form>
      </div>
  )
}

export default CreateEventForm;