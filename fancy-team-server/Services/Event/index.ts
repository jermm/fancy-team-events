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
        }

    }


    public static updateEvent = async (id: number, title: string, eventType: string, eventDate: string,
                                       startTime: string, endTime: string, locationName: string,
                                       description: string, deadline: string, emails: string[]) => {
       try {
           await UserEventStatusService.addInvitees(id, emails);
           return await getConnection()
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
       }
    };


    public static findEventsByUser = async (id: string) => {
        try {
            const user = await UserService.findUser(id);
            const eventsAttended = await createQueryBuilder("event")
                .leftJoinAndSelect(Event, "event", "UserEventStatus.email = :email", {email: user.email})
                .getMany();
            const eventsCreated = await getConnection()
                .getRepository(Event)
                .createQueryBuilder("event")
                .where("event.createdBy = :id", {id: id})
                .getMany();

            return [eventsAttended, eventsCreated];
        }
        catch(error){

        }
    };


    public static addEvent = async (createdById: string, title: string, tyoe: string, eventDate: string,
                      startTime: string, endTime: string, locationName: string,
                      description: string, deadline: string, emails: string[]) => {
      try {
          const emailService = new EmailService();
          const eventRepository = getConnection().getRepository(Event);
          const event = new Event();
          event.createdBy = createdById;
          event.title = title;
          event.eventType = tyoe;
          event.eventDate = eventDate;
          event.createdAt = 'now';
          event.startTime = startTime;
          event.endTime = endTime;
          event.locationName = locationName;
          event.description = description;
          event.deadlineDate = deadline;


          await emailService.send('sam.thambu@sap.com', emails, {
              event_link: 'www.gooogle.com',
              event_name: 'hello world'
          });

          return eventRepository.save(event).then(async (result) => {
              await UserEventStatusService.addInvitees(result.id, emails);

              return result;
          });
      }
      catch(error){
          console.log();
      }
    };
}
