"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
//import {userResolver} from "../resolvers/userResolver"
// Define the User type
const userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
    }
});
const queryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            }
        },
        users: {
            type: new graphql_1.GraphQLList(userType)
        }
    }
});
const mutatorType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString }
            }
            //resolve: addUserResolver
        }
    }
});
exports.userSchema = new graphql_1.GraphQLSchema({ query: queryType, mutation: mutatorType });
//# sourceMappingURL=user.js.map