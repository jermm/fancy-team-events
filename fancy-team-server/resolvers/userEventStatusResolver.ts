
import {UserEventStatusService} from '../Services/UserEventStatus'

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
                return UserEventStatusService.findInviteesByEvent(inputObject.id);
            }
        }

    },
    Mutation: {
        addInvitees: {
            resolve(_: any, inputObject: inputForAddingUserStatus): any {
                return UserEventStatusService.addInvitees(inputObject.eventId, inputObject.emails);
            }
        },

        updateInvite: {
            resolve(_: any, inputObject: inputForAddingUserStatus): any {
                return UserEventStatusService.updateInvite(inputObject.eventId, inputObject.email, inputObject.isAttending);
            }
        }
    }
};



