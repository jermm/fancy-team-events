
import {GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema} from "graphql";


// Define the User type
const userEventStatusType: GraphQLObjectType = new GraphQLObjectType({
    name: 'UserEventStatus',
    fields: {
        userId: { type: GraphQLString },
        email: { type: GraphQLString },
        event: { type: GraphQLInt },
        isAttending: { type: GraphQLBoolean },
        tShirtSize: { type: GraphQLString }
    }
});

const userEventStatusQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        invitees: {
            type: new GraphQLList(userEventStatusType),
            // `args` describes the arguments that the `user` query accepts
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLInt) }
            }
        },
        inviteForEvent: {
            type: userEventStatusType,
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLInt) }
            }
        }
    }
});



const userEventStatusMutation = new GraphQLObjectType( {
        name: 'Mutation',
        fields: {
            addInvitees: {
                type: userEventStatusType,
                args: {
                    eventId: { type: GraphQLInt },
                    userId: { type: GraphQLString },
                    emails: { type: new GraphQLList(GraphQLString) },
                    isAttending: { type: GraphQLBoolean },
                    tShirtSize: { type: GraphQLString }
                }
            },

            updateInvite: {
                type: userEventStatusType,
                args: {
                    eventId: { type: GraphQLInt },
                    isAttending: { type: GraphQLBoolean },
                    tShirtSize: { type: GraphQLString }
                }
            }
        }
    }
);

export const userEventStatusSchema: GraphQLSchema = new GraphQLSchema({query: userEventStatusQuery, mutation: userEventStatusMutation});
