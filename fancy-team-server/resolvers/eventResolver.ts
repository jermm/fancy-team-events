import {EventService} from '../services/Event';
import {Event} from  '../entity/Event';

interface inputForEvent {
    id: number
}

interface inputForAddingEvent {
    eventType: string,
    eventDate: string,
    id: number,
    createdBy: number,
    title: string,
    type: string,
    date: string,
    startTime: string,
    endTime: string,
    locationName: string,
    description: string,
    deadline: string,
    inviteEmails: string,
    emails: string[],
    tshirt:string
}

export const eventResolver = {
    Query: {
        event: {
            resolve(_: any, inputObject: inputForEvent, context): Promise<any> {
                return EventService.findEvent(inputObject.id);
            }
        },
        eventsByUser : {
            resolve(_: any, inputObject: inputForEvent, context): Promise<Event[]> {
                return EventService.findEventsByUser(context).then(result => {
                    let eventsAttended = result[0].map(el => ({...el, ...{isOrganizer:false}}));
                    result[1].forEach(elem => {
                        eventsAttended = eventsAttended.filter(el => el.id != elem.id);
                    });
                    const eventsOrganized = result[1].map(el => ({...el, ...{isOrganizer:true}}));
                    return [...eventsOrganized, ...eventsAttended];
                });
            }
       }

    },
    Mutation: {
        addEvent: {
            resolve(_: any, inputObject: inputForAddingEvent, context): any {
                convertInputObject(inputObject);
                return EventService.addEvent(inputObject, context);
            }
        },
        updateEvent: {
            resolve(_: any, inputObject: inputForAddingEvent, context): any {
                convertInputObject(inputObject);
                return EventService.updateEvent(inputObject, context);
            }
        }
    }

};

function convertInputObject(inputObject) {
    // TODO move conversion
    if (inputObject.type) {
        inputObject.eventType = inputObject.type;
        delete inputObject.type;
    }
    if (inputObject.date) {
        inputObject.eventDate = inputObject.date;
        delete inputObject.date;
    }

}
