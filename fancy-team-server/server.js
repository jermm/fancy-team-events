var express = require('express');
var graphqlHTTP = require('express-graphql');
var schemas = require('./types/index').default;

const { Client } = require('pg');
const client = new Client();
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schemas,
    graphiql: true,
}));

client.connect().then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');

});
