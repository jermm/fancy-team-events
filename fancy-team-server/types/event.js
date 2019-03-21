"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `

type Event {
    id: ID!
    type: String
    date: Date
    createdBy: User
    startTime: String
    endTime: String
    location: String
    description: String
    deadlineDate: Date
}

type Query {
    event(id: ID!): Event
    events(userId: ID!): [Event]
}
`;
//# sourceMappingURL=event.js.map