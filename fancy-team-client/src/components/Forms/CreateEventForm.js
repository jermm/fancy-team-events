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
      <>
        <h1>{headerTitle}</h1>
      <form onSubmit={handleSubmit} className='CreateEventForm'>
        <div className='createEventForm-SectionA'>
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
          <FromTextArea
              name = 'description'
              placeholder = 'Description'
              labelText = 'Description'
              id = 'Description'
              wrapperDivClassName ='create-event-description'
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
          <FromSelect
              name ='tshirt'
              options = {['No', 'Yes']}
              className = 'tshirt'
              id ='Tshirt'
              labelName ='Tshirt'
              {...props}
          />
        </div>

        <div className='createEventForm-SectionB'>
          <Search {...props}/>
          <div>
            <button type='submit' id='createEventForm-Submit-btn'>Submit</button>
          </div>
        </div>
      </form>
      </>
  )
}

export default CreateEventForm;