"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const event_1 = __importDefault(require("./event"));
const user_1 = __importDefault(require("./user"));
const carpool_1 = __importDefault(require("./carpool"));
const typeDefs = [user_1.default, event_1.default, carpool_1.default];
exports.default = merge_graphql_schemas_1.mergeTypes(typeDefs, { all: true });
//# sourceMappingURL=index.js.map