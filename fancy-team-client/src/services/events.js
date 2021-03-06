import config from '../config';


const constructFetchRequestObject = (httpVerb, accessToken, query) => {
  if (!httpVerb && !accessToken) {
    throw new Error(`httpVerb or AccessToken Missing`);
  }
  return {
    method: httpVerb,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(query)
  };
};


export const getEventByUser = async (accessToken) => {
  const query = {query: `{eventsByUser { id eventDate title isOrganizer}}`, variables: null};
  const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));
  const responseJson = await response.json();
  return responseJson.data;
};


export const createEvent = async (accessToken, eventFormValues) => {
  // const {eventName, eventType, eventDate, eventStart, eventEnd, autoComplete, description, inviteEmails} = event;
  const query = {
    query: `mutation createEvent($title:String, $type: String, $locationId: String $locationName:String, $inviteEmails:String $eventDate:String, $startTime:String, $endTime:String, $description:String, $emails:[String], $deadlineDate: String, $tshirt:String)
      { addEvent(title: $title, locationId: $locationId,  type:$type, date:$eventDate, locationName:$locationName, inviteEmails:$inviteEmails, startTime:$startTime, endTime:$endTime, description:$description, emails:$emails, deadlineDate: $deadlineDate, tshirt: $tshirt) { id }}
    `,
    variables: {...eventFormValues}
  };

  return await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));
};

export const updateInvite = async (accessToken, eventId, isAttending, tShirtSize) => {
    const query = {
        query: `mutation editInvite($eventId:Int!, $isAttending:Boolean, $tShirtSize: String)
      { updateInvite(eventId: $eventId, isAttending:$isAttending, tShirtSize: $tShirtSize) {email}}
    `,
        variables: {eventId:eventId, isAttending:isAttending, tShirtSize: tShirtSize}
    };

    const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));

    const responseJson = await response.json();
    return responseJson.data;
};


export const getInvite = async (accessToken, eventId) => {
    const query = {
        query: `query GetInvite($eventId:Int!)
            { inviteForEvent(eventId: $eventId) {isAttending eventId:event email tShirtSize}}`,
        variables: {eventId:eventId}
    };

    const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));

    const responseJson = await response.json();
    return responseJson.data;
};

export const getInvitees = async (accessToken, eventId) => {
    const query = {
        query: `query GetInvite($eventId:Int!)
            { invitees(eventId: $eventId) {isAttending eventId:event email tShirtSize}}`,
        variables: {eventId:eventId}
    };

    const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));

    const responseJson = await response.json();
    return responseJson.data;
};

export const getEventById = async (accessToken, eventId) => {
  const query = {
    query: `query GetEvent($id:Int!) {event(id:$id) {id title locationId eventDate startTime endTime locationName description type:eventType inviteEmails deadlineDate tshirt}}`,
    variables: {id: eventId}
  };
  const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));
  const responseJson = await response.json();
  return responseJson.data;
};

export const updateEventById = async (accessToken, eventId, startEvent, event) => {
  // const {eventName, eventType, eventDate, eventStart, eventEnd, autoComplete, description, inviteEmails} = event;

  //Do comparision
  //in vars, do only diff
  const newEvent = {};
  
  Object.keys(event).forEach(function (key) {
    if(event[key] !== startEvent[key]) {
      newEvent[key] = event[key]
    }
  });

  const query = {
    query: `mutation EditEvent($id:Int!, $title:String, $locationId: String, $type: String, $locationName:String,  $inviteEmails:String,  $eventDate:String, $startTime:String, $endTime:String, $description:String, $deadlineDate: String, $tshirt: String)
      { updateEvent(id:$id, title: $title, locationId: $locationId, type:$type, date:$eventDate, locationName:$locationName, inviteEmails:$inviteEmails, startTime:$startTime, endTime:$endTime, description:$description, deadlineDate: $deadlineDate, tshirt: $tshirt) { id }}
    `,
    variables: {id: eventId, ...newEvent}
  };
  const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));
  const responseJson = await response.json();
  return responseJson.data;
};