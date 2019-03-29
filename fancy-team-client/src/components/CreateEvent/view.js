import React, {Component} from 'react';
import Form from '../Forms/view';
import Header from '../Header/header';
import { withAuth } from '@okta/okta-react';
// let accessToken;
/*
        title: { type: GraphQLString },
        createdBy: {type: GraphQLInt},
        type: { type: GraphQLString },
        date: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        locationName: { type: GraphQLString },
        description: { type: GraphQLString },
        deadlineDate: { type: GraphQLString } // deadline add field
*/



/*createdBy: '1' // userId -- see how to get this.
eventDate: "2019-03-06"
eventType: "TeamOuting"
eventend: "10:05"
eventstart: "04:03"
title:
inviteEmails: "a@a.com, b@b.com" ///
location: "adfadsfdsfsadf"*/


/*
mutation createEvent($title: String, $newType: String, $createdBy: Int!, $location: String)
{ addEvent(title: $title, type: $newType, createdBy: $createdBy, location: $location) { id }}
*/


// const updateCountryFetch = (event) => {
//   const query = JSON.stringify({
//     query: `mutation createEvent($title: String, $newType: String, $createdBy: Int!, $location: String)
//       { addEvent(title: $newsd, type: $newType, createdBy: $createdBy, location: $location) { id }}
//     `
//   });
//   return query;
// };

// autocomplete: "San Jose, CA, USA"
// description: "what"
// eventDate: "2019-03-29"
// eventType: "TeamOuting"
// eventend: "12:00"
// eventname: "asdsad"
// eventstart: "00:59"
// inviteEmails: "tharan.vijay@gmail.com"
// tshirt: "Yes"


/// -----
// createdBy: number,
//     title: string,
//     type: string,
//     date: string,
//     startTime: string,
//     endTime: string,
//     locationName: string,
//     description: string,
//     deadline: string,
//     emails: string[]

const updateCountryFetch = (event) => {
  console.log(event);
  console.log('@@@@@@@@');

  const query = JSON.stringify({
    query: `mutation createEvent($title: String, $newType: String, $createdBy: Int!, $location: String)
      { addEvent(title: $title, type: $newType, createdBy: $createdBy, location: $location) { id }}
    `,
    variables: {
      title: event.eventname,
      type: event.eventType,
      date: event.eventDate,
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