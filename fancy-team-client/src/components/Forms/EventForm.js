import React from 'react';
import FormInputs from './FormInputs';
import FromSelect from './FormSelect';
import FromTextArea from './FormTextArea';
import Search from '../Maps/view';
import Back from "../../assets/back-svgrepo-com.svg";
import { Link } from 'react-router-dom';

function EventForm(props) {
  const {
    handleSubmit,
    headerTitle,
    values,
    locationIdCallback,
    submitBtnText
  } = props;

  return (
      <div className='event-form-container'>
        <div>
          <Link to="/event">
            <img src={Back} alt="Create Event" className='back-icon' width="100" />
          </Link>
        </div>
        <h1 className='form-header'>{headerTitle}</h1>
        <form onSubmit={handleSubmit} className='event-form'>
          <FormInputs
              type='text'
              name='title'
              placeholder='eventName*'
              labelText='EventName'
              id='name'
              wrapperDivClassName='event-form-eventName'
              value={values.title}
              {...props}
          />
          <FromSelect
              name='type'
              options={['SelectEvent', 'TeamOuting', 'FareWell', 'Volunteering']}
              wrapperDivClassName='event-form-select-event'
              id='type'
              labelName='EventType'
              value={values.type}
              {...props}
          />
          <div className='event-Date-Time'>
            <FormInputs
                type='date'
                name='eventDate'
                placeholder=''
                labelText='EventDate'
                id='eventDate'
                wrapperDivClassName='event-form-eventDate'
                value={values.eventDate}
                {...props}
            />
            <FormInputs
                type='time'
                name='startTime'
                placeholder=''
                labelText='EventStartTime'
                id='eventStartTime'
                wrapperDivClassName='event-form-eventStartTime'
                value={values.startTime}
                {...props}
            />
            <FormInputs
                type='time'
                name='endTime'
                placeholder=''
                labelText='EventEndTime'
                id='eventEndTime'
                wrapperDivClassName='event-form-eventEndTime'
                value={values.endTime}
                {...props}
            />
          </div>
          <Search locationIdCallback={locationIdCallback} {...props}/>
          <FromTextArea
              name='inviteEmails'
              placeholder='Enter Invitee Emails'
              value={values.inviteEmails}
              labelText='Invitee List'
              id='eventInviteeList'
              wrapperDivClassName='event-form-eventInviteeList'
              {...props}
          />
          <div className='create-event-form-search'>
            <FromSelect
                name='tshirt'
                options={['No', 'Yes']}
                wrapperDivClassName='event-form-tShirt'
                id='tShirt'
                labelName='Tshirt'
                {...props}
            />
            <FromTextArea
                name='description'
                placeholder='Description'
                labelText='Description'
                id='description'
                wrapperDivClassName='event-form-description'
                value={values.description}
                {...props}
            />
          </div>
          <div>
            <button type='submit' id='event-form-submit-btn'>{submitBtnText}</button>
          </div>
        </form>
      </div>
  )
}

export default EventForm;