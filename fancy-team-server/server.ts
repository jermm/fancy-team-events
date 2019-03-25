'use strict';
import express from 'express';
import cors from 'cors';
// Import all routes
import { GraphQLRoutes } from './routes';
const app = express();

app.use(cors()); // for development reasons only

GraphQLRoutes.map(app);

const { Client } = require('pg');
const client = new Client();

client.connect().then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});
