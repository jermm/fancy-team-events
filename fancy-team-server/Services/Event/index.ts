import { Client } from 'pg';
import {Event} from "../../entity/Event";
import {getConnection} from "typeorm";
import {findUser} from '../User';
import {User} from "../../entity/User";
import {UserEventStatus} from "../../entity/UserEventStatus";

const client = new Client();
client.connect();

const getEventQuery = "select id, type, description from events where id=$1";
const addEventQuery = "insert into events (created_by, type, event_date, location_name, description, deadline) values ($1, $2, $3, $4, $5, $6 ) RETURNING id, type, event_date, description;";


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

export const addEvent = async(createdById: number, tyoe: string, eventDate: string,
                              startTime: string, endTime: string,locationName: string,
                              description: string, deadline: string) => {

    const createdUser = await findUser(createdById);
    const eventRepository = getConnection().getRepository(Event);
    const event = new Event();
    const userEventStatusRepository = getConnection().getRepository(UserEventStatus);
    const userEventStatus = new UserEventStatus();
    event.createdBy = createdUser;
    event.type = tyoe;
    event.eventDate = eventDate;
    event.createdAt = 'now';
    event.startTime = startTime;
    event.endTime = endTime;
    event.locationName = locationName;
    event.description = description;
    event.deadlineDate = deadline;

     userEventStatus.event =event;
     userEventStatus.user = event.createdBy;
     userEventStatus.isAttending = true;
     userEventStatus.roleType = 'Organizer'; userEventStatus.tShirtSize = 'L';
    event.userEventStatuses =[userEventStatus];

    return eventRepository.save(event).then((result) => {
        return result;
    });
};