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


    // TODO handle deletes
    public static addInvitees = async (eventId: number, emails = [], onlyEmailChange: boolean) => {
        if(emails.length < 0){
            return;
        }

        const userEventStatusRepository = getConnection().getRepository(UserEventStatus);

        const invitees: UserEventStatus[] = [];

        return userEventStatusRepository.createQueryBuilder("findEmails")
            .where("email = :emailList", {emailList: emails})
            .where("event = :eventId", {eventId: eventId})
            .getMany().then(function (result) {
                emails.forEach(function (email) {
                    let emailExists = false;

                    result.forEach(function (userEventStatusRow) {
                        if (userEventStatusRow.email === email) {
                            emailExists = true
                        }
                    });
                    if (!emailExists) {
                        const userEventStatus = new UserEventStatus();
                        userEventStatus.event = eventId;
                        userEventStatus.email = email;
                        userEventStatus.isAttending = false;
                        invitees.push(userEventStatus);
                        // TODO always send email here
                    }
                    // TODO if not onlyEmailChange, send emails here to old emails
            });
            console.log(invitees);
            if (invitees.length > 0) {
                return userEventStatusRepository.insert(invitees);
            }
        });
    };

}