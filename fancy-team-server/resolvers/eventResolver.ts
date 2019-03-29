import {EventService} from '../Services/Event'

interface inputForEvent {
    id: number
}

interface inputForAddingEvent {
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
            resolve(_: any, inputObject: inputForEvent, context): Promise<any> {
                return EventService.findEventsByUser(context.UserId).then(result => {
                    return {
                        eventsAttended:result[0],
                        eventsOrganized:result[1]
                    };
                });
            }
       }

    },
    Mutation: {
        addEvent: {
            resolve(_: any, inputObject: inputForAddingEvent, context): any {

                return EventService.addEvent(context.UserId, inputObject.title, inputObject.type, inputObject.date,
                    inputObject.startTime, inputObject.endTime, inputObject.locationName,
                    inputObject.description, inputObject.deadline, inputObject.emails);
            }
        },
        updateEvent: {
            resolve(_: any, inputObject: inputForAddingEvent, context): any {
                return EventService.updateEvent(inputObject.id, inputObject.title, inputObject.type, inputObject.date,
                    inputObject.startTime, inputObject.endTime, inputObject.locationName,
                    inputObject.description, inputObject.deadline, inputObject.emails);
            }
        }
    }

};
