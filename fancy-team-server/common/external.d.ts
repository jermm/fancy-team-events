import * as express from 'express';



export interface FancyEventsRequest extends express.Request {
    jwt: any //TODO have to define the type
    user: { oauthId: string, email: string}
}


export interface IUserEntity {
    id: number,
    email: string,
    oauthId: string
}

export interface IAddUserEntity {
    email: string,
    oauthId: string
}

interface IEmail {
    email: string,
}

interface IPersonalizations {
    to: IEmail[],
    bcc: IEmail[],
    dynamic_template_data: any
}
export interface ISendGridApiBody {
    from: IEmail,
    personalizations: IPersonalizations[],
    template_id: string

}

export interface IEmailOptions {
    method: string,
    uri: string,
    body?: ISendGridApiBody,
    headers: any,
    json: boolean
}
