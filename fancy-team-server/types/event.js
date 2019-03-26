"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const EventType = new graphql_1.GraphQLObjectType({
    name: 'Event',
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        title: { type: graphql_1.GraphQLString },
        createdBy: { type: graphql_1.GraphQLInt },
        type: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        startTime: { type: graphql_1.GraphQLString },
        endTime: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        deadlineDtate: { type: graphql_1.GraphQLString }
    }
});
const EventQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        event: {
            type: EventType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                userId: { type: graphql_1.GraphQLInt }
            }
        }
    }
});
const EventMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEvent: {
            type: EventType,
            args: {
                type: { type: graphql_1.GraphQLString },
                title: { type: graphql_1.GraphQLString },
                date: { type: graphql_1.GraphQLString },
                createdBy: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                startTime: { type: graphql_1.GraphQLString },
                endTime: { type: graphql_1.GraphQLString },
                location: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                deadlineDate: { type: graphql_1.GraphQLString }
            }
        }
    }
});
exports.eventSchema = new graphql_1.GraphQLSchema({ query: EventQuery, mutation: EventMutation });
//# sourceMappingURL=event.js.map