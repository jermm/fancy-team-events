import { Client } from 'pg';
const client = new Client();
client.connect();

const getEventQuery = "select id, type, description from event where id=$1";
const addEventQuery = "insert into events (created_by, type, event_date, location_name, description, deadline) values ($1, $2, $3, $4, $5, $6 ) RETURNING id, type, event_date, decription;";


export interface eventObject {
    id: Number,
    type: String,
    date: String,
    description: String

}

export const findEvent = (id: Number) => {
    return client.query(getEventQuery, [id]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    })
};

export const addEvent = (createdById: Number, tyoe: String, eventDate: String, locationName: String, description: String, deadline: String) => {
    return client.query(addEventQuery, [createdById, tyoe, eventDate, locationName, description, deadline]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    })
};