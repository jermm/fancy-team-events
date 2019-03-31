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
    query: `mutation createEvent($title:String, $type: String, $locationName:String, $eventDate:String, $startTime:String, $endTime:String, $description:String, $emails:[String])
      { addEvent(title: $title, type:$type, date:$eventDate, location:$locationName,startTime:$startTime, endTime:$endTime, description:$description, emails:$emails) { id }}
    `,
    variables: {...eventFormValues}
  };

  const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));

  const responseJson = await response.json();
  return responseJson.data;
};

export const getEventById = async (accessToken, eventId) => {
  const query = {
    query: `query GetEvent($id:Int!) {event(id:$id) {id title eventDate startTime endTime locationName description eventType }}`,
    variables: {id: eventId}
  };
  const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));
  const responseJson = await response.json();
  return responseJson.data;
};

export const updateEventById = async (accessToken, eventId, event) => {
  // const {eventName, eventType, eventDate, eventStart, eventEnd, autoComplete, description, inviteEmails} = event;

  const query = {
    query: `mutation EditEvent($id:Int!, $title:String, $type: String, $locationName:String, $eventDate:String, $startTime:String, $endTime:String, $description:String)
      { updateEvent(id:$id, title: $title, type:$type, date:$eventDate, location:$locationName,startTime:$startTime, endTime:$endTime, description:$description) { id }}
    `,
    variables: {id: eventId, ...event}
  };
  const response = await fetch(config.resourceServer.eventsUrl, constructFetchRequestObject('POST', accessToken, query));
  const responseJson = await response.json();
  console.log(responseJson);
  console.log('^^^^^^^^^^^');
  return responseJson.data;
};