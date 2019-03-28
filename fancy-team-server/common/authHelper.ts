import * as express from 'express';
import OktaJwtVerifier from '@okta/jwt-verifier';
import * as oktaConfig from'../config/okta-config.json';
import {FancyEventsRequest} from "./external";

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: oktaConfig.resourceServer.oidc.issuer,
    assertClaims: oktaConfig.resourceServer.assertClaims
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

        return oktaJwtVerifier.verifyAccessToken(accessToken)
            .then((jwt) => {
                req.jwt = jwt;
                next();
            })
            .catch((err) => {
                res.status(401).send(err.message);
            });

    }

}
