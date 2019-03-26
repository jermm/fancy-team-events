import {findEvent, addEvent, eventObject} from '../Services/Event'

interface inputForEvent {
    id: number
}

interface inputForAddingEvent {
    createdBy: number,
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
        }

    },
    Mutation: {
        addEvent: {
            resolve(_: any, inputObject: inputForAddingEvent ): any {
                console.log(inputObject);
                return addEvent(inputObject.createdBy, inputObject.type,
                    inputObject.date, inputObject.startTime, inputObject.endTime, inputObject.locationName, inputObject.description, inputObject.deadline);
            }
        }
    }

};
