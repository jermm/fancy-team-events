import * as Express from 'express';
import {FancyEventsRequest} from "./external";

export class Context<A> {

    constructor(
        private request: FancyEventsRequest,
        private repsonse: Express.Response,
        private userId: string
    ) { }

    public get Response(): Express.Response {
        return this.repsonse;
    }

    public get Request(): FancyEventsRequest {
        return this.request;
    }
    public get UserId(): string {
        return this.userId;
    }

    public hasUserRoles(roles: string[]): boolean {
        // TODO: Here you should check if the user as the needed roles for the requested query
        return true;
    }

}
