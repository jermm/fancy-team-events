
import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString,  GraphQLSchema, GraphQLList } from 'graphql';
//import {userResolver} from "../resolvers/userResolver"


// Define the User type
const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
       // events: { type: new GraphQLList(EventType) }
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
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
              }
            }
        }
    }
);



export const userSchema: GraphQLSchema = new GraphQLSchema({query: queryType, mutation: mutatorType});
