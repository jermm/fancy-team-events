import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString,  GraphQLSchema } from 'graphql';

import {findUserResolver} from "../resolvers/userResolver"



// Define the User type
const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

// @ts-ignore
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            // @ts-ignore
            resolve: findUserResolver
        }
    }
});

// @ts-ignore
const mutatorType = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            // @ts-ignore
            resolve: function (_, {name, email}) {
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
export const userSchema = new GraphQLSchema({query: queryType, mutation: mutatorType});
