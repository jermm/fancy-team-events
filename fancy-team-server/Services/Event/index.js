"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client();
client.connect();
const getEventQuery = "select id, type, description from events where id=$1";
const addEventQuery = "insert into events (created_by, type, event_date, location_name, description, deadline) values ($1, $2, $3, $4, $5, $6 ) RETURNING id, type, event_date, description;";
exports.findEvent = (id) => {
    return client.query(getEventQuery, [id]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    });
};
exports.addEvent = (createdById, tyoe, eventDate, locationName, description, deadline) => {
    console.log(createdById);
    return client.query(addEventQuery, [createdById, tyoe, eventDate, locationName, description, deadline]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    });
};
//# sourceMappingURL=index.js.map