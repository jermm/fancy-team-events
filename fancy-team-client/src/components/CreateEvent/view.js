import React, {Component} from 'react';
import Form from '../Forms/view';
import Header from '../Header/header';
import {withAuth} from '@okta/okta-react';
import {createEvent} from "../../services/events";
import { withToastManager } from 'react-toast-notifications';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      formInitialValue: {
        title:'',
        eventDate:'',
        description:'',
        startTime:'',
        endTime:'',
        type:'',
        inviteEmails:'',
        locationName:''
      }
    };
    this.locationIdCallback = this.locationIdCallback.bind(this);
    this.formCallBack = this.formCallBack.bind(this);
  }

  componentDidMount() {
    this.getAccessToken();
  }

  formCallBack(accessToken) {
    const Values = {
      title:'',
      eventDate:'',
      description:'',
      startTime:'',
      endTime:'',
      type:'',
      locationName:'',
      inviteEmails:'',
    };
    const that = this;
    const {locationId} = this.state;
    return (async function createEventCallback(event, action) {
      if (locationId) {
        event.locationId = locationId;
      }
      let eventCreation = await createEvent(accessToken, event);
      if(eventCreation.statusText === "OK"){
        that.props.toastManager.add('The event has been successfully saved to. Please visit Events Page to look at the event', { appearance: 'success',autoDismiss: true});
      }
      action.resetForm(Values);
    });
  }

  locationIdCallback(locationId) {
    this.setState({locationId: locationId});
  }

  async getAccessToken() {
    try {
      const accessToken = await this.props.auth.getAccessToken();
      this.setState({
        accessToken: accessToken
      })
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  }

  render() {
    return (
        <div className='event-container'>
          <Header/>
          <Form
              type='createEvent'
              headerTitle="Create Event"
              submitBtnText='Create'
              locationIdCallback={this.locationIdCallback}
              handleFormSubmitCallBack={this.formCallBack(this.state.accessToken)}
              formInitialValues={this.state.formInitialValue}/>
        </div>
    );
  }
}

export default withAuth(withToastManager(CreateEvent));