'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import all routes
const routes_1 = require("./routes");
const app = express_1.default();
routes_1.GraphQLRoutes.map(app);
const { Client } = require('pg');
const client = new Client();
client.connect().then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});
//# sourceMappingURL=server.js.map