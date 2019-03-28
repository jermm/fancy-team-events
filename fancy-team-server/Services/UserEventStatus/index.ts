import { Client } from 'pg';
import {getConnection} from "typeorm";
import {UserEventStatus} from "../../entity/UserEventStatus";

const client = new Client();
client.connect();


export const findInviteesByEvent = (id: number) => {
    const userEventStatusRepository = getConnection().getRepository(UserEventStatus);
    return userEventStatusRepository.find({event: id}).then((result) => {
        return result;
    }).catch((e) => {
        console.log(e);
    })
};

export const updateInvite = async(eventId: number, email: string, isAttending: boolean) => {
    return getConnection()
        .createQueryBuilder()
        .update(UserEventStatus)
        .set({isAttending:isAttending})
        .where("event = :id", { id: eventId })
        .andWhere("email = :email", { email: email })
        .execute();
};

export const addInvitees = async(eventId: number, emails: string[]) => {

    const userEventStatusRepository = getConnection().getRepository(UserEventStatus);

    const invitees: UserEventStatus[] = [];

    for (let i = 0; i < emails.length; i++) {
        const userEventStatus = new UserEventStatus();
        userEventStatus.event = eventId;
        userEventStatus.email = emails[i];
        userEventStatus.isAttending = false;
        invitees.push(userEventStatus);
    }
    return userEventStatusRepository.save(invitees);

};