"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const CarpoolDriverType = new graphql_1.GraphQLObjectType({
    name: 'CarpoolDriver',
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        driver: { type: graphql_1.GraphQLString },
        eventId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        noOfPassengers: { type: graphql_1.GraphQLInt },
    }
});
const CarpoolDriverQuery = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: CarpoolDriverType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            }
        }
    }
});
const CarpoolDriverMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCarpoolDriver: {
            type: CarpoolDriverType,
            args: {
                driverId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                eventId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                noOfPassengers: { type: graphql_1.GraphQLInt }
            }
        }
    }
});
exports.carpoolSchema = new graphql_1.GraphQLSchema({ query: CarpoolDriverQuery, mutation: CarpoolDriverMutation });
//# sourceMappingURL=carpool.js.map