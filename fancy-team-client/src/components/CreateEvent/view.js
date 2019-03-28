import React from 'react';
import Form from '../Forms/view';

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

const updateCountryFetch = (event) => {

  const query = JSON.stringify({
    query: `mutation createEvent($title: String, $newType: String, $createdBy: Int!, $location: String)
      { addEvent(title: $title, type: $newType, createdBy: $createdBy, location: $location) { id }}
    `,
    variables: {
      title: 'asdas',
      newType: 'sadsa',
      createdBy: 1,
      location: 'sadasdas'
    }
  }, );
  return query;
};

function createEventCallback(event, action){
  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: updateCountryFetch(event)
  }).then(res => {
    return res.json();
  }).then(body => {
    console.log(body);
    console.log('data returned');
  });
}

function CreateEvent (){
  return (
    <Form type='createEvent' headerTitle="Create Event" handleFormSubmitCallBack={createEventCallback}/>
  );
}

export default CreateEvent;