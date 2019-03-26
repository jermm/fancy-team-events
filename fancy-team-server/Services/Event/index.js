"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const Event_1 = require("../../entity/Event");
const typeorm_1 = require("typeorm");
const User_1 = require("../User");
const UserEventStatus_1 = require("../../entity/UserEventStatus");
const client = new pg_1.Client();
client.connect();
const getEventQuery = "select id, type, description from events where id=$1";
const addEventQuery = "insert into events (created_by, type, event_date, location_name, description, deadline) values ($1, $2, $3, $4, $5, $6 ) RETURNING id, type, event_date, description;";
exports.findEvent = (id) => {
    const eventRepository = typeorm_1.getConnection().getRepository(Event_1.Event);
    return eventRepository.findOne({ id: id }).then((result) => {
        return result;
    }).catch((e) => {
        console.log(e);
    });
};
exports.addEvent = async (createdById, tyoe, eventDate, startTime, endTime, locationName, description, deadline) => {
    const createdUser = await User_1.findUser(createdById);
    const eventRepository = typeorm_1.getConnection().getRepository(Event_1.Event);
    const event = new Event_1.Event();
    const userEventStatusRepository = typeorm_1.getConnection().getRepository(UserEventStatus_1.UserEventStatus);
    const userEventStatus = new UserEventStatus_1.UserEventStatus();
    event.createdBy = createdUser;
    event.type = tyoe;
    event.eventDate = eventDate;
    event.createdAt = 'now';
    event.startTime = startTime;
    event.endTime = endTime;
    event.locationName = locationName;
    event.description = description;
    event.deadlineDate = deadline;
    userEventStatus.event = event;
    userEventStatus.user = event.createdBy;
    userEventStatus.isAttending = true;
    userEventStatus.roleType = 'Organizer';
    userEventStatus.tShirtSize = 'L';
    event.userEventStatuses = [userEventStatus];
    return eventRepository.save(event).then((result) => {
        return result;
    });
};
//# sourceMappingURL=index.js.map