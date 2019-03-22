import {findEvent, addEvent, eventObject} from '../Services/Event'

interface inputForEvent {
    id: Number
}

interface inputForAddingEvent {
    createdBy: Number,
    type: String,
    date: String,
    locationName: String,
    description: String,
    deadline: String
}

export const eventResolver = {
    Query: {
        event: {
            resolve(_: any, inputObject: inputForEvent): Promise<eventObject> {
                return findEvent(inputObject.id);
            }
        }

    },
    Mutation: {
        addEvent: {
            resolve(_: any, inputObject: inputForAddingEvent ): any {
                console.log(inputObject);
                return addEvent(inputObject.createdBy, inputObject.type,
                    inputObject.date, inputObject.locationName, inputObject.description, inputObject.deadline);
            }
        }
    }

};
