import   { mergeSchemas} from 'graphql-tools';
import {eventSchema} from "./event";
import {userSchema} from "./user";
import {userEventStatusSchema} from "./userEventStatus";
// import {carpoolSchema} from "./carpool"
import {userResolver} from "../resolvers/userResolver";
import {eventResolver} from "../resolvers/eventResolver";
import {userEventStatusResolver} from  "../resolvers/userEventStatusResolver";

const typeDefs = [userSchema, eventSchema, userEventStatusSchema];
const resolvers = [userResolver, eventResolver, userEventStatusResolver];

export default mergeSchemas({schemas: typeDefs, resolvers: resolvers});
