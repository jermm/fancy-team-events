import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString,  GraphQLSchema } from 'graphql';
import {userResolver, addUserResolver} from "../resolvers/userResolver"

// Define the User type
const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            }
        }
    }
});


const mutatorType = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve: addUserResolver
            }
        }
});


// @ts-ignore
export const userSchema: GraphQLSchema = new GraphQLSchema({query: queryType, mutation: mutatorType});
