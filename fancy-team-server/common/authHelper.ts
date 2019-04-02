import * as express from 'express';
import OktaJwtVerifier from '@okta/jwt-verifier';
import {config} from 'node-config-ts'
import {FancyEventsRequest} from "./external";
import {UserService} from "../services/User";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: config.okta.resourceServer.oidc.issuer,
    assertClaims: config.okta.resourceServer.assertClaims
});


/**
 * Authentication Manager
 */
export class AuthenticationManager {

    public static async performAuthChecks(req: FancyEventsRequest, res: express.Response, next: any): Promise<any> {
        const authHeader = req.headers.authorization || '';
        const match = authHeader.match(/Bearer (.+)/);

        if (!match) {
            res.status(401);
            return next('Unauthorized');
        }

        const accessToken = match[1];
        try {
            const jwt = await oktaJwtVerifier.verifyAccessToken(accessToken);
            req.jwt = jwt;
            req.user = {
                email: jwt.claims.sub,
                oauthId: jwt.claims.uid
            };
            // check if user exists in Db
            let user = await UserService.findUserByEmail(req.user.email);
            // if no user, create bare minimum user info in Db
            if (!user) {
                user = await UserService.addUser(req.user.email, req.user.oauthId);
                console.log(`New user created with Id ${user.id}`);
            }
            next();

        }
        catch(err) {
            res.status(401).send(err.message);
        };

    }

}
