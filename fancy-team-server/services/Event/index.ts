import {Client} from 'pg';
import {Event} from "../../entity/Event";
import {getConnection} from "typeorm";
import {createQueryBuilder} from 'typeorm';
import {UserEventStatus} from "../../entity/UserEventStatus";
import {UserService} from "../../services/User";

import {UserEventStatusService} from "../../services/UserEventStatus"


const client = new Client();
client.connect();

export class EventService {

    public static findEvent = async (id: number) => {
        try {
            const eventRepository = getConnection().getRepository(Event);
            return await eventRepository.findOne({id: id}).then(function (res) {
                return res;
            });
        }
        catch (error) {
            console.log(error);
            throw new Error('Cannot find event' + error.message);

        }

    };


    public static updateEvent = async (updateObject, context) => {
       try {

           let parsedEmails = [];
           if (updateObject.inviteEmails && updateObject.inviteEmails.length > 0) {
               parsedEmails = updateObject.inviteEmails.split(',');
               updateObject.inviteEmails = parsedEmails;
           }

           await UserEventStatusService.addInvitees(updateObject.id, parsedEmails);
           await getConnection()
               .createQueryBuilder()
               .update(Event)
               .set(updateObject)
               .where("id = :id", {id: updateObject.id})
               .execute();
           if (Object.keys(updateObject).length !== 2) {
               await UserEventStatusService.sendInvites(updateObject.id);
           }
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


    public static addEvent = async (updateObject, context) => {
      try {
          const eventRepository = getConnection().getRepository(Event);
          const event = new Event();
          const userId = context.UserId;
          const req = context.Request;
          let parsedEmails = [];
          if (updateObject.inviteEmails && updateObject.inviteEmails.length > 0) {
              parsedEmails = updateObject.inviteEmails.split(',');
              updateObject.inviteEmails = parsedEmails;
          }

          event.createdBy = userId;
          event.organizerEmail = req.user.email;
          event.title = updateObject.title;
          event.eventType = updateObject.eventType;
          event.eventDate = updateObject.eventDate;
          event.createdAt = 'now';
          event.startTime = updateObject.startTime;
          event.endTime = updateObject.endTime;
          event.locationName = updateObject.locationName;
          event.description = updateObject.description;
          event.deadlineDate = updateObject.deadline;
          const eventSaved = await eventRepository.save(event);
                             await UserEventStatusService.addInvitees(eventSaved.id, parsedEmails);
                             return eventSaved;
        
      }
      catch(error){
          throw new Error('failed to save events' + error.message);
      }
    };
}
