var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


const { Client } = require('pg');
const client = new Client();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type user {
    id: Int!
    name: String
    email: String
  
  }

  type Query {
    users: [user]
    user(id: Int): user
  }
  
  type Mutation {
    addUser(name: String, email: String): user
  }
  
`);

const getAllUserQuery = "select id, email, name from users;";
const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";

// The root provides a resolver function for each API endpoint
var root = {
    users: () => {
        return client.query(getAllUserQuery).then(res => {
            return res.rows;
        }).catch(function (err) {
            console.log(err);
        })
    },
    user: (userInfo) => {
        return client.query(getUserQuery, [userInfo.id]).then(res => {
            if (res.rows.length > 0) {
                return res.rows[0];
            }
        });

    },
    addUser: (newUser) => {
        if (newUser.name && newUser.email) {
            return client.query(addUserQuery, [newUser.name, newUser.email]).then(res => {
                if (res.rows.length > 0) {
                    return res.rows[0];
                }
            })

        }

        // console.log(user);



    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

client.connect().then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');

});
