"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const _1 = __importDefault(require("./"));
const typeDefs = [_1.default];
exports.default = merge_graphql_schemas_1.mergeTypes(typeDefs, { all: true });
//# sourceMappingURL=index.js.map