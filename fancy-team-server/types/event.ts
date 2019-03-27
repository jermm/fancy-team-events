
import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";

const EventType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        createdBy: {type: GraphQLInt},
        type: { type: GraphQLString },
        date: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        locationName: { type: GraphQLString },
        description: { type: GraphQLString },
        deadlineDate: { type: GraphQLString }
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
                userId: { type: GraphQLInt }
            }
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
                title: { type: GraphQLString },
                date: { type: GraphQLString },
                createdBy: { type: new GraphQLNonNull(GraphQLInt) },
                startTime: { type: GraphQLString },
                endTime: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                deadlineDate: { type: GraphQLString }
            }
        }
    }
});

export const eventSchema: GraphQLSchema = new GraphQLSchema({query: EventQuery, mutation: EventMutation});



