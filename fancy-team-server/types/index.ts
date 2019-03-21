import { mergeTypes } from "merge-graphql-schemas";

import Event from "./";

const typeDefs = [Event];

export default mergeTypes(typeDefs, { all: true });