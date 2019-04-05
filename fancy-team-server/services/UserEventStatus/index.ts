import { Client } from 'pg';
import {getConnection} from "typeorm";
import {UserEventStatus} from "../../entity/UserEventStatus";
import {EmailService} from "../Email";

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

    public static findInvideByEventForUser = async(id: number, context) => {
        try {
            const req = context.Request;
            const userEventStatusRepository = getConnection().getRepository(UserEventStatus);
            return await userEventStatusRepository.findOne({ event: id, email: req.user.email}).then((res) => {
                console.log(res);
                return res;
            });
        }
        catch(error){
            console.log(error);
        }

    };


    public static sendInvites = async (eventId: number) => {
        const userEventStatusRepository = getConnection().getRepository(UserEventStatus);
        const emailList = [];

        return userEventStatusRepository.createQueryBuilder("findEmails")
            .where("event = :eventId", {eventId: eventId})
            .getMany().then(function (result) {
                result.forEach(function (userEventStatusRow) {
                    emailList.push(userEventStatusRow.email)
                });
                return new EmailService().sendEventEmail(emailList, eventId);
            });
    };

    public static sendInvitesToEmails = async (eventId: number, emails: string[]) => {
        new EmailService().sendEventEmail(emails, eventId);

    };

    public static updateInvite = async (eventId: number, isAttending: boolean, context) => {
        try {
            const req = context.Request;
            return await getConnection()
                .createQueryBuilder()
                .update(UserEventStatus)
                .set({isAttending: isAttending})
                .where("event = :id", {id: eventId})
                .andWhere("email = :email", {email: req.user.email})
                .execute();
        }
        catch(error){
            console.log(error);
        }
    };

    // TODO handle deletes
    public static addInvitees = async (eventId: number, emails = []) => {
        if(emails.length < 0){
            return;
        }

        const userEventStatusRepository = getConnection().getRepository(UserEventStatus);

        const invitees: UserEventStatus[] = [];
        const usersToEmail: string[] = [];

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
                        usersToEmail.push(email);
                    }
            });
            if (usersToEmail.length > 0) {
                UserEventStatusService.sendInvitesToEmails(eventId, usersToEmail);
            }
            if (invitees.length > 0) {
                return userEventStatusRepository.insert(invitees);
            }
        });
    };

}