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
    emails: string[]
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
                    const eventsAttended = result[0].map(el => ({...el, ...{isOrganizer:false}}));
                    const eventsOrganized = result[1].map(el => ({...el, ...{isOrganizer:true}}));
                    return [...eventsOrganized, ...eventsAttended];
                });
            }
       }

    },
    Mutation: {
        addEvent: {
            resolve(_: any, inputObject: inputForAddingEvent, context): any {

                return EventService.addEvent(inputObject.title, inputObject.type, inputObject.date,
                    inputObject.startTime, inputObject.endTime, inputObject.locationName,
                    inputObject.description, inputObject.deadline, inputObject.inviteEmails, context);
            }
        },
        updateEvent: {
            resolve(_: any, inputObject: inputForAddingEvent, context): any {

                // TODO move converison
                if (inputObject.type) {
                    inputObject.eventType = inputObject.type;
                    delete inputObject.type;
                }
                if (inputObject.date) {
                    inputObject.eventDate = inputObject.date;
                    delete inputObject.date;
                }

                return EventService.updateEvent(inputObject, context);
            }
        }
    }

};
