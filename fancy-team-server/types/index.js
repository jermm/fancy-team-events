"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const user_1 = require("./user");
const userResolver_1 = require("../resolvers/userResolver");
const typeDefs = [user_1.userSchema];
const resolvers = [userResolver_1.userResolver];
exports.default = graphql_tools_1.mergeSchemas({ schemas: typeDefs, resolvers: resolvers });
//# sourceMappingURL=index.js.map