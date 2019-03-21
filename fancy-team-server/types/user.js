"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const userResolver_1 = require("../resolvers/userResolver");
// Define the User type
const userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString }
    }
});
// @ts-ignore
const queryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            // @ts-ignore
            resolve: userResolver_1.findUserResolver
        }
    }
});
// @ts-ignore
const mutatorType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString }
            },
            // @ts-ignore
            resolve: function (_, { name, email }) {
                console.log(name);
                // @ts-ignore
                // return client.query(addUserQuery, [name, email]).then(res => {
                //     if (res.rows.length > 0) {
                //         return res.rows[0];
                //     }
                // })
            }
        }
    }
});
// @ts-ignore
exports.userSchema = new graphql_1.GraphQLSchema({ query: queryType, mutation: mutatorType });
//# sourceMappingURL=user.js.map