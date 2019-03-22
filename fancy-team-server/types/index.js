"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const event_1 = require("./event");
const user_1 = require("./user");
const carpool_1 = require("./carpool");
const userResolver_1 = require("../resolvers/userResolver");
const eventResolver_1 = require("../resolvers/eventResolver");
const typeDefs = [user_1.userSchema, event_1.eventSchema, carpool_1.carpoolSchema];
const resolvers = [userResolver_1.userResolver, eventResolver_1.eventResolver];
exports.default = graphql_tools_1.mergeSchemas({ schemas: typeDefs, resolvers: resolvers });
//# sourceMappingURL=index.js.map