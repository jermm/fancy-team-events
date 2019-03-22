import   { mergeSchemas} from 'graphql-tools';
import {eventSchema} from "./event";
import {userSchema} from "./user";
import {carpoolSchema} from "./carpool"
import {userResolver} from "../resolvers/userResolver";

const typeDefs = [userSchema, eventSchema, carpoolSchema];
const resolvers = [userResolver];

export default mergeSchemas({schemas: typeDefs, resolvers: resolvers});
