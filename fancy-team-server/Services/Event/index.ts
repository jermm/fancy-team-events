import { Client } from 'pg';
import {Event} from "../../entity/Event";
import {getConnection} from "typeorm";
import {createQueryBuilder} from 'typeorm';
import {UserEventStatus} from "../../entity/UserEventStatus";

const client = new Client();
client.connect();



export interface eventObject {
    id: Number,
    type: String,
    date: String,
    description: String

}

export const findEvent = (id: number) => {
    const eventRepository = getConnection().getRepository(Event);
    return eventRepository.findOne({id: id}).then((result) => {
        return result;
    }).catch((e) => {
        console.log(e);
    })
};

export const updateEvent = async(id: number, title: string, eventType: string, eventDate: string,
                                 startTime: string, endTime: string,locationName: string,
                                 description: string, deadline: string) => {
   return getConnection()
          .createQueryBuilder()
          .update(Event)
          .set({eventType:eventType, title: title,eventDate: eventDate,
                startTime: startTime,endTime: endTime,  locationName: locationName,
                description: description, deadlineDate: deadline})
          .where("id = :id", { id: id })
          .execute();
};


export const findEventsByUser = async(id: number) => {
    const eventsAttended = await createQueryBuilder("event")
        .leftJoinAndSelect(Event, "event", "UserEventStatus.userId = :id")
        .getMany();
    const eventsCreated = await getConnection()
        .getRepository(Event)
        .createQueryBuilder("event")
        .where("event.createdBy = :id", {id: id})
        .getMany();

    return [eventsAttended,eventsCreated];
};

export const addEvent = async(createdById: number, title: string, tyoe: string, eventDate: string,
                              startTime: string, endTime: string,locationName: string,
                              description: string, deadline: string, emails: string[]) => {


    const eventRepository = getConnection().getRepository(Event);
    const event = new Event();
    const userEventStatusRepository = getConnection().getRepository(UserEventStatus);
    const userEventStatus = new UserEventStatus();
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



    return eventRepository.save(event).then((result) => {
        userEventStatus.event = result.id;

        return result;
    });
};
