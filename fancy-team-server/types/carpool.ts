import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";


const CarpoolDriverType: GraphQLObjectType = new GraphQLObjectType({
    name: 'CarpoolDriver',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        driver: { type: GraphQLString },
        eventId: { type: new GraphQLNonNull(GraphQLInt) },
        noOfPassengers: { type: GraphQLInt },
        //passengers: { type: new GraphQLList(UserType) }
    }
});

const CarpoolDriverQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: CarpoolDriverType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            }
        }
    }
});
const CarpoolDriverMutation: GraphQLObjectType = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addCarpoolDriver: {
            type: CarpoolDriverType,
            args: {
                driverId: { type: new GraphQLNonNull(GraphQLInt) },
                eventId: { type: new GraphQLNonNull(GraphQLInt) },
                noOfPassengers: { type: GraphQLInt }
            }

        }
    }
});

export const carpoolSchema: GraphQLSchema = new GraphQLSchema({query: CarpoolDriverQuery, mutation: CarpoolDriverMutation});
