import {Client} from 'pg';
import {Event} from "../../entity/Event";
import {getConnection} from "typeorm";
import {createQueryBuilder} from 'typeorm';
import {UserEventStatus} from "../../entity/UserEventStatus";
import {EmailService} from "../../services/Email";
import {UserService} from "../../services/User";

import {UserEventStatusService} from "../../services/UserEventStatus"


const client = new Client();
client.connect();

export class EventService {

    public static findEvent = async (id: number) => {
        try {
            const eventRepository = getConnection().getRepository(Event);
            return await eventRepository.findOne({id: id}).then(function (res) {
                console.log(res);
                return res;
            });
        }
        catch (error) {
            console.log(error);
            throw new Error('Cannot find event' + error.message);

        }

    }


    public static updateEvent = async (updateObject, context) => {
       try {

           let parsedEmails = [];
           let onlyEmailChange = true;
           if (updateObject.inviteEmails && updateObject.inviteEmails.length > 0) {
               parsedEmails = updateObject.inviteEmails.split(',');
               updateObject.inviteEmails = parsedEmails;
           }

           console.log(updateObject);

           if (Object.keys(updateObject).length !== 2) {
               onlyEmailChange = false
           }


           await UserEventStatusService.addInvitees(updateObject.id, parsedEmails, onlyEmailChange);
           await getConnection()
               .createQueryBuilder()
               .update(Event)
               .set(updateObject)
               .where("id = :id", {id: updateObject.id})
               .execute();
       }
       catch(error) {
           console.log(error);
           throw new Error('failed to update event' + error.message);

       }
    };


    public static findEventsByUser = async (context): Promise<any> => {
        try {
            const req = context.Request;
            const eventsAttended = await getConnection()
            .getRepository(UserEventStatus).createQueryBuilder("userStatus")
                .leftJoinAndSelect(Event, "event", "event.organizerEmail = userStatus.email")
                .getMany();
            const eventsCreated = await getConnection()
                .getRepository(Event)
                .createQueryBuilder("event")
                .where("event.createdBy = :id", {id: req.user.oauthId})
                .getMany();

            return [eventsAttended, eventsCreated];
        }
        catch(error){

         throw new Error('Cannot find events' + error.message);
        }
    };


    public static addEvent = async (title: string, tyoe: string, eventDate: string,
                      startTime: string, endTime: string, locationName: string,
                      description: string, deadline: string, emails: string, context) => {
      try {
          const emailService = new EmailService();
          const eventRepository = getConnection().getRepository(Event);
          const event = new Event();
          const userId = context.UserId;
          const req = context.Request;
          event.createdBy = userId;
          event.organizerEmail = req.user.email;
          event.title = title;
          event.eventType = tyoe;
          event.eventDate = eventDate;
          event.createdAt = 'now';
          event.startTime = startTime;
          event.endTime = endTime;
          event.locationName = locationName;
          event.description = description;
          event.deadlineDate = deadline;

          let parsedEmails = emails.split(',');
          console.log(event);
       
          const eventSaved = await eventRepository.save(event);
                             await UserEventStatusService.addInvitees(eventSaved.id, parsedEmails, false);
                             return eventSaved;
        
      }
      catch(error){
          throw new Error('failed to save events' + error.message);
      }
    };
}
