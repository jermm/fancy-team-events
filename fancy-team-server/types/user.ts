import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString,  GraphQLSchema } from 'graphql';

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
        },
        users: {
            type: new GraphQLList(userType)
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
            }
        }
    }
});


// @ts-ignore
export const userSchema: GraphQLSchema = new GraphQLSchema({query: queryType, mutation: mutatorType});
