import {findEvent, addEvent, eventObject} from '../Services/Event'

interface inputForEvent {
    id: Number
}

interface inputForAddingEvent {
    createdById: Number,
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
                return addEvent(inputObject.createdById, inputObject.type,
                    inputObject.date, inputObject.locationName, inputObject.description, inputObject.deadline);
            }
        }
    }

};
