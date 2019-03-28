
import {findInviteesByEvent, addInvitees, updateInvite} from '../Services/UserEventStatus'

interface inputForUser {
    id: number
}

interface inputForAddingUserStatus {
    eventId: number,
    email: string,
    isAttending: boolean,
    emails: string[]
}

export const userEventStatusResolver = {
    Query: {
        invitees: {
            resolve(_: any, inputObject: inputForUser): any {
                return findInviteesByEvent(inputObject.id);
            }
        }

    },
    Mutation: {
        addInvitees: {
            resolve(_: any, inputObject: inputForAddingUserStatus): any {
                return addInvitees(inputObject.eventId, inputObject.emails);
            }
        },

        updateInvite: {
            resolve(_: any, inputObject: inputForAddingUserStatus): any {
                return updateInvite(inputObject.eventId, inputObject.email, inputObject.isAttending);
            }
        }
    }
};



