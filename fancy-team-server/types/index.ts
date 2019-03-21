import { mergeTypes } from "merge-graphql-schemas";

import Event from "./event";
import User from "./user";
import Carpool from "./carpool"

const typeDefs = [User, Event, Carpool];

export default mergeTypes(typeDefs, { all: true });