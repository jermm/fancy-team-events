'use strict';
import express from 'express';
// Import all routes
import { GraphQLRoutes } from './routes';
const app = express();
GraphQLRoutes.map(app);
const { Client } = require('pg');
const client = new Client();

client.connect().then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});
