
import {GraphQLBoolean} from "graphql";


// Define the User type
const userEventStatusType: GraphQLObjectType = new GraphQLObjectType({
    name: 'UserEventStatus',
    fields: {
        email: { type: GraphQLString },
        eventId: { type: GraphQLInt },
        isAttending: { type: GraphQLBoolean }
    }
});

const userEventStatusQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        invitees: {
            type: userEventStatusType,
            // `args` describes the arguments that the `user` query accepts
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
                    emails: { type: new GraphQLList(GraphQLString) },
                    isAttending: { type: GraphQLBoolean },
                }
            },

            updateInvite: {
                type: userEventStatusType,
                args: {
                    userId: { type: GraphQLInt },
                    eventId: { type: GraphQLInt },
                    isAttending: { type: GraphQLBoolean },
                }
            }
        }
    }
);

export const userEventStatusSchema: GraphQLSchema = new GraphQLSchema({query: userEventStatusQuery, mutation: userEventStatusMutation});
