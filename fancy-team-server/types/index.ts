import   { mergeSchemas} from 'graphql-tools';
import {eventSchema} from "./event";
import {userSchema} from "./user";
// import {carpoolSchema} from "./carpool"
import {userResolver} from "../resolvers/userResolver";
import {eventResolver} from "../resolvers/eventResolver";

const typeDefs = [userSchema, eventSchema];
const resolvers = [userResolver, eventResolver];

export default mergeSchemas({schemas: typeDefs, resolvers: resolvers});
