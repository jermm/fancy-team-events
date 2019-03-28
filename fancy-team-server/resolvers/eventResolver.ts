import {findEvent, addEvent, findEventsByUser, updateEvent} from '../Services/Event'

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
    deadline: string
}

export const eventResolver = {
    Query: {
        event: {
            resolve(_: any, inputObject: inputForEvent): Promise<any> {
                return findEvent(inputObject.id);
            }
        },
        eventsByUser : {
            resolve(_: any, inputObject: inputForEvent): Promise<any> {
                return findEventsByUser(inputObject.id).then(result => {
                    console.log(result);
                });
            }
       }

    },
    Mutation: {
        addEvent: {
            resolve(_: any, inputObject: inputForAddingEvent ): any {
                return addEvent(inputObject.createdBy, inputObject.title, inputObject.type, inputObject.date,
                    inputObject.startTime, inputObject.endTime, inputObject.locationName,
                    inputObject.description, inputObject.deadline);
            }
        },
        updateEvent: {
            resolve(_: any, inputObject: inputForAddingEvent ): any {
                return updateEvent(inputObject.id, inputObject.title, inputObject.type, inputObject.date,
                    inputObject.startTime, inputObject.endTime, inputObject.locationName,
                    inputObject.description, inputObject.deadline);
            }
        }
    }

};
