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
            return await eventRepository.findOne({id: id});
        }
        catch (error) {
            console.log(error);
            throw new Error('Cannot find event' + error.message);

        }

    }


    public static updateEvent = async (id: number, title: string, eventType: string, eventDate: string,
                                       startTime: string, endTime: string, locationName: string,
                                       description: string, deadline: string, emails: string[], context) => {
       try {
           await UserEventStatusService.addInvitees(id, emails);
           await getConnection()
               .createQueryBuilder()
               .update(Event)
               .set({
                   eventType: eventType, title: title, eventDate: eventDate,
                   startTime: startTime, endTime: endTime, locationName: locationName,
                   description: description, deadlineDate: deadline
               })
               .where("id = :id", {id: id})
               .execute();
       }
       catch(error) {
           console.log(error);
           throw new Error('failed to update event' + error.message);

       }
    };


    public static findEventsByUser = async (context) => {
        try {
            const req = context.Request;
            const eventsAttended = await createQueryBuilder("event")
                .leftJoinAndSelect(Event, "event", "UserEventStatus.email = :email", {email: req.user.email})
                .getMany();
            const eventsCreated = await getConnection()
                .getRepository(Event)
                .createQueryBuilder("event")
                .where("event.createdBy = :id", {id: req.user.oauthId})
                .getMany();

            return [eventsAttended, eventsCreated];
        }
        catch(error){

         throw new Error('Cannot fund events' + error.message);
        }
    };


    public static addEvent = async (title: string, tyoe: string, eventDate: string,
                      startTime: string, endTime: string, locationName: string,
                      description: string, deadline: string, emails: string[], context) => {
      try {
          const emailService = new EmailService();
          const eventRepository = getConnection().getRepository(Event);
          const event = new Event();
          const userId = context.UserId;
          const req = context.Request;
          event.createdBy = userId;
          event.title = title;
          event.eventType = tyoe;
          event.eventDate = eventDate;
          event.createdAt = 'now';
          event.startTime = startTime;
          event.endTime = endTime;
          event.locationName = locationName;
          event.description = description;
          event.deadlineDate = deadline;


          await emailService.send(req.user.email, emails, {
              event_link: 'www.gooogle.com',
              event_name: title
          });

          const eventSaved = await eventRepository.save(event);
                             await UserEventStatusService.addInvitees(eventSaved.id, emails);
                             return eventSaved;

      }
      catch(error){
          throw new Error('failed to save events' + error.message);
      }
    };
}
