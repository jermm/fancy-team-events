"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Services/Event");
exports.eventResolver = {
    Query: {
        event: {
            resolve(_, inputObject) {
                return Event_1.findEvent(inputObject.id);
            }
        }
    },
    Mutation: {
        addEvent: {
            resolve(_, inputObject) {
                console.log(inputObject);
                return Event_1.addEvent(inputObject.createdBy, inputObject.type, inputObject.date, inputObject.locationName, inputObject.description, inputObject.deadline);
            }
        }
    }
};
//# sourceMappingURL=eventResolver.js.map