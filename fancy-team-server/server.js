var User =  require("./entity/User").User;

var express = require('express');
var graphqlHTTP = require('express-graphql');
var schemas = require('./types/index').default;

require("reflect-metadata");
var createConnection = require("typeorm").createConnection;


// import {User} from "./entity/User"

// const { Client } = require('pg');
// const client = new Client();
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schemas,
    graphiql: true,
}));

createConnection({
    type: "postgres",
    entities: [
        User
    ],
    synchronize: true,
}).then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');
}).catch(error => console.log(error));

