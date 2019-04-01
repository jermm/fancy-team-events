'use strict';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
process.env["NODE_CONFIG_TS_DIR"] = __dirname + "/config";
// Import all routes
import { GraphQLRoutes } from './routes';
import {User} from "./entity/User";
import {Event} from "./entity/Event";
import {Carpool} from "./entity/Carpool";
import {UserEventStatus} from "./entity/UserEventStatus";
import {createConnection} from "typeorm";


createConnection({
    type: "postgres",
    database: "fancyevents",
    entities: [
        User,
        Event,
        Carpool,
        UserEventStatus,
    ],
    synchronize: true,
}).then(() => {
    const app = express();

    app.use(cors()); // for development reasons only

    GraphQLRoutes.map(app);
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
}).catch(error => console.log(error));
