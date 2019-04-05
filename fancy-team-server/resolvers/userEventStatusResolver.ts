
import {UserEventStatusService} from '../services/UserEventStatus'



interface inputForAddingUserStatus {
    eventId: number,
    email: string,
    isAttending: boolean,
    emails: string[]
}

export const userEventStatusResolver = {
    Query: {
        invitees: {
            resolve(_: any, inputObject: inputForAddingUserStatus): any {
                return UserEventStatusService.findInviteesByEvent(inputObject.eventId);
            }
        },

        inviteForEvent: {
            resolve(_: any, inputObject: inputForAddingUserStatus, context): Promise<any> {
                return UserEventStatusService.findInvideByEventForUser(inputObject.eventId, context);
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
            resolve(_: any, inputObject: inputForAddingUserStatus, context): any {
                return UserEventStatusService.updateInvite(inputObject.eventId, inputObject.isAttending, context);
            }
        }
    }
};



