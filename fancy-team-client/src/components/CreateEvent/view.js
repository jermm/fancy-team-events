import React, {Component} from 'react';
import Form from '../Forms/view';
import Header from '../Header/header';
import { withAuth } from '@okta/okta-react';

const updateCountryFetch = (event) => {
  const query = JSON.stringify({
    query: `mutation createEvent($title:String, $type: String, $locationName:String, $eventDate:String, $startTime:String, $endTime:String, $description:String)
      { addEvent(title: $title, type:$type, date:$eventDate, location:$locationName,startTime:$startTime, endTime:$endTime, description:$description) { id }}
    `,
    variables: {
      title: event.eventname,
      type: event.eventType,
      eventDate: event.eventDate,
      startTime: event.eventstart,
      endTime: event.eventend,
      locationName: event.autoComplete,
      description: event.description,
      emails: event.inviteEmails
    }
  }, );
  return query;
};

class CreateEvent extends Component {
  constructor(props){
    super(props);
    this.state = {accessToken:''}
  }

  componentDidMount() {
    this.getAccessToken();
  }

  setToken(accessToken){
    return (function createEventCallback(event, action){
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: updateCountryFetch(event)
      }).then(res => {
        console.log(res);
        return res.json();
      }).then(body => {
        console.log(body);
        console.log('data returned');
      });
    });
  }

  async getAccessToken() {
    try {
      const accessToken = await this.props.auth.getAccessToken();
      this.setState({
        accessToken : accessToken
      })
    }catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  }

  render() {
    return (
      <div className='create-event-container'>
      <Header/>
      <Form type='createEvent' headerTitle="Create Event" handleFormSubmitCallBack={this.setToken(this.state.accessToken)}/>
      </div>
    );
  }
}

export default withAuth(CreateEvent);