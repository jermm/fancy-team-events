'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import all routes
const routes_1 = require("./routes");
const User_1 = require("./entity/User");
const Event_1 = require("./entity/Event");
const Carpool_1 = require("./entity/Carpool");
const CarpoolPassenger_1 = require("./entity/CarpoolPassenger");
const UserEventStatus_1 = require("./entity/UserEventStatus");
const typeorm_1 = require("typeorm");
typeorm_1.createConnection({
    type: "postgres",
    database: "fancyevents",
    entities: [
        User_1.User,
        Event_1.Event,
        Carpool_1.Carpool,
        CarpoolPassenger_1.CarpoolPassenger,
        UserEventStatus_1.UserEventStatus,
    ],
    synchronize: true,
}).then(() => {
    const app = express_1.default();
    app.use(cors_1.default()); // for development reasons only
    routes_1.GraphQLRoutes.map(app);
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
}).catch(error => console.log(error));
//# sourceMappingURL=server.js.map