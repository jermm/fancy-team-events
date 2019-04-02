import { Client } from 'pg';
import {getConnection} from "typeorm";
import {UserEventStatus} from "../../entity/UserEventStatus";

const client = new Client();
client.connect();

export class UserEventStatusService {


    public static findInviteesByEvent = async(id: number) => {
        try {
            const userEventStatusRepository = getConnection().getRepository(UserEventStatus);
            return await userEventStatusRepository.find({event: id});
        }
          catch(error){
           console.log(error);
         }


    };

    public static updateInvite = async (eventId: number, email: string, isAttending: boolean) => {
        try {
            return await getConnection()
                .createQueryBuilder()
                .update(UserEventStatus)
                .set({isAttending: isAttending})
                .where("event = :id", {id: eventId})
                .andWhere("email = :email", {email: email})
                .execute();
        }
        catch(error){
            console.log(error);
        }
    };


  public static addInvitees = async (eventId: number, emails = []) => {

    if(emails.length < 0){
        return;
    }
        const userEventStatusRepository = getConnection().getRepository(UserEventStatus);

        const invitees: UserEventStatus[] = [];

        for (let i = 0; i < emails.length; i++) {
            const userEventStatus = new UserEventStatus();
            userEventStatus.event = eventId;
            userEventStatus.email = emails[i];
            userEventStatus.isAttending = false;
            invitees.push(userEventStatus);
        }
        return await userEventStatusRepository.save(invitees);

    };

}