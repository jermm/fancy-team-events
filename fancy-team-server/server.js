var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var graphql = require('graphql');
require("typescript-require");

// require("types/user").schema2
var schemas = require('./types/index').default;


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


// Define the User type
var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        name: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString }
    }
});


var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
            },
            resolve: function (_, {id}) {
                console.log(id);
                return client.query(getUserQuery, [id]).then(res => {
                    if (res.rows.length > 0) {
                        return res.rows[0];
                    }
                });
            }
        }
    }
});

var mutatorType = new graphql.GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: graphql.GraphQLString },
                email: { type: graphql.GraphQLString }
            },
            resolve: function (_, {name, email}) {
                return client.query(addUserQuery, [name, email]).then(res => {
                    if (res.rows.length > 0) {
                        return res.rows[0];
                    }
                })
            }
        }
    }

});

var schema2 = new graphql.GraphQLSchema({query: queryType, mutation: mutatorType});


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
    schema: schemas,
    rootValue: root,
    graphiql: true,
}));

client.connect().then(() => {
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');

});
