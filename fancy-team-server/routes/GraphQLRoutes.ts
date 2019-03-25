import * as express from "express";
import graphqlHTTP from 'express-graphql';
import schemas from  '../types/index';

export class GraphQLRoutes {
    static map(app: express.Application): void {
        // Add GraphQL to express route
        app.use('/graphql',
            // Creates a GraphQLHTTP per request
            graphqlHTTP({
                schema: schemas,
                graphiql: true
            }));
    }
}


