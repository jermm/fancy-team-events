
import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLBoolean} from "graphql";

const EventType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        locationId: { type: GraphQLString },
        title: { type: GraphQLString },
        createdBy: {type: GraphQLString},
        organizerEmail: {type : GraphQLString },
        eventType: { type: GraphQLString },
        eventDate: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        locationName: { type: GraphQLString },
        description: { type: GraphQLString },
        deadlineDate: { type: GraphQLString },
        isOrganizer: { type: GraphQLBoolean },
        tshirt: {type: GraphQLString },
        inviteEmails: {type: GraphQLList(GraphQLString) }

    }
});

const EventQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        event: {
            type: EventType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                createdBy: { type: GraphQLString }
            }
        },
        eventsByUser: {
            type: new GraphQLList(EventType),
            args: {}

        }
    }
});

const EventMutation: GraphQLObjectType = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addEvent: {
            type: EventType,
            args: {
                type: { type: GraphQLString },
                locationId: { type: GraphQLString },
                title: { type: GraphQLString },
                date: { type: GraphQLString },
                createdBy: { type: GraphQLString },
                startTime: { type: GraphQLString },
                endTime: { type: GraphQLString },
                locationName: { type: GraphQLString },
                description: { type: GraphQLString },
                deadlineDate: { type: GraphQLString },
                emails:{type: new GraphQLList(GraphQLString)},
                inviteEmails: {type: GraphQLString },
                tshirt: {type: GraphQLString }

            }
        },
        updateEvent: {
            type: EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                locationId: { type: GraphQLString },
                title: { type: GraphQLString },
                type: { type: GraphQLString },
                date: { type: GraphQLString },
                startTime: { type: GraphQLString },
                endTime: { type: GraphQLString },
                locationName: { type: GraphQLString },
                description: { type: GraphQLString },
                deadlineDate: { type: GraphQLString },
                inviteEmails: {type: GraphQLString },
                tshirt: {type: GraphQLString }
            }
        }
    }
});

export const eventSchema: GraphQLSchema = new GraphQLSchema({query: EventQuery, mutation: EventMutation});



