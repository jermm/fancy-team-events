// import {Carpool} from "./entity/Carpool";
// import {CarpoolPassenger} from "./entity/CarpoolPassenger";
// import {UserEventStatus} from "./entity/UserEventStatus";
require("reflect-metadata");

var express = require('express');
var graphqlHTTP = require('express-graphql');
var schemas = require('./types/index').default;

var createConnection = require("typeorm").createConnection;


var User =  require("./entity/User").User;
var Event =  require("./entity/Event").Event;
var Carpool =  require("./entity/Carpool").Carpool;
var CarpoolPassenger =  require("./entity/CarpoolPassenger").CarpoolPassenger;
var UserEventStatus =  require("./entity/UserEventStatus").UserEventStatus;


var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schemas,
    graphiql: true,
}));

createConnection({
    type: "postgres",
    entities: [
        User
     //   Event
       //  Carpool,
       // CarpoolPassenger
       // // UserEventStatus,
    ],
    synchronize: true,
}).then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
}).catch(error => console.log(error));

