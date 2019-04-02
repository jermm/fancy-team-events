import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import Form from '../Forms/view';
import Header from '../Header/header';
import {getEventById} from "../../services/events";
import {updateEventById} from "../../services/events";

class EditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {formInitialValue: {
        title:'',
        eventDate:'',
        description:'',
        startTime:'',
        endTime:'',
        location:'',
        eventType:'SelectEvent'
      },
      eventId: Number(this.props.match.params.id),
      enableReinitialize: false,
      accessToken:''
    };
  }

  editEventCallback() {
    const {accessToken, eventId} = this.state;
    return(async function editEventFnCallback(event, action){
      await updateEventById(accessToken, eventId, event);
    });
  }

  async componentDidMount() {
    const token = await this.props.auth.getAccessToken();
    const fetchEventById = await getEventById(token, this.state.eventId);
    this.setState({
      formInitialValue: fetchEventById.event,
      enableReinitialize: true,
      accessToken:token
    });
  }

  render() {
    const {title, eventDate, description, startTime, endTime, locationName,  eventType, inviteEmails} = this.state.formInitialValue;
    console.log(this.state.formInitialValue);
    const FormValues = {
      title: title,
      eventDate: eventDate,
      description: description,
      startTime: startTime,
      endTime: endTime,
      type: eventType,
      locationName: locationName,
      inviteEmails: inviteEmails
    };

    return (
        <div className='event-container'>
          <Header/>
          <Form
              enableReinitialize={this.state.enableReinitialize}
              formInitialValues={FormValues}
              type='editEvent'
              headerTitle="Edit Event"
              submitBtnText='Edit'
              handleFormSubmitCallBack={this.editEventCallback()}
          />
        </div>
    );
  }
}

export default withAuth(EditComponent);
