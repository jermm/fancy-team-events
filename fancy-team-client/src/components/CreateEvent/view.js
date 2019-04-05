import React, {Component} from 'react';
import Form from '../Forms/view';
import Header from '../Header/header';
import {withAuth} from '@okta/okta-react';
import {createEvent} from "../../services/events";

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
    }
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
      reset:true
    };
    return (async function createEventCallback(event, action) {
      await createEvent(accessToken, event);
      action.resetForm(Values);
    });
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
              handleFormSubmitCallBack={this.formCallBack(this.state.accessToken)}
              formInitialValues={this.state.formInitialValue}/>
        </div>
    );
  }
}

export default withAuth(CreateEvent);