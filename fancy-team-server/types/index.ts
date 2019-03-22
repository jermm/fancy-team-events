import   { mergeSchemas} from 'graphql-tools';
import Event from "./event";
import {userSchema} from "./user";
import Carpool from "./carpool"
import {userResolver} from "../resolvers/userResolver";

const typeDefs = [userSchema];
const resolvers = [userResolver];

export default mergeSchemas({schemas: typeDefs, resolvers: resolvers});