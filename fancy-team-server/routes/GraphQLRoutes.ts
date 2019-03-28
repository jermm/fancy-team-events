import * as express from "express";
import graphqlHTTP from 'express-graphql';
import schemas from  '../types/index';
import {AuthenticationManager} from "../common/authHelper";
import {Context} from '../common/context';
import {FancyEventsRequest} from "../common/external";
import {EmailService} from "../services/Email";

export class GraphQLRoutes {
    static map(app: any): void {
        // Add GraphQL to express route
        app.use('/graphql',
            AuthenticationManager.performAuthChecks,
            (req: FancyEventsRequest, res: express.Response) => {
                // Creates a GraphQLHTTP per request
                graphqlHTTP({
                    schema: schemas,
                    context: new Context(req, res, req.user.oauthId),
                    graphiql: true
                })(req, res);
            });

        // sample email service consumption
        const emailService = new EmailService();
        app.get('/sendEmail', async (req: FancyEventsRequest, res: express.Response) => {
            await emailService.send('sam.thambu@sap.com', ['sam.thambu@sap.com'], {
                event_link: 'www.gooogle.com',
                event_name: 'hello world'
            });
            res.json({m: 'email sent successfully using sendgrid'});
            res.status(200);
        });

    }
}


