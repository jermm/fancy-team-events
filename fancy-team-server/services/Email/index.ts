import requestPromise from 'request-promise';
import {config} from 'node-config-ts'
import {IEmail, IEmailOptions} from "../../common/external";
import {UserEventStatus} from "../../entity/UserEventStatus";
import {EventService} from "../Event";
const emailConfig = config.sendgrid;

export class EmailService {

    private options: IEmailOptions;

    constructor() {
        let sendgridApiKey: string = process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : emailConfig.sendgridApiKey;
        this.options = {
            method: 'POST',
            uri: emailConfig.sendgridSendAPI,
            headers: {
                Authorization: 'Bearer ' + sendgridApiKey,
                'Content-Type': 'application/json'
            },
            json: true
        };
    }

    public sendEventEmail(usersToEmail: string[], eventId: number) {
        const finalEmailList = [];
        // TODO get subject line to work.
        return EventService.findEvent(eventId).then(eventInfo => {
            usersToEmail.forEach(email => {
                if (email !== eventInfo.organizerEmail && email.length > 0) {
                    finalEmailList.push(email)
                }
            });
            return this.send(eventInfo.organizerEmail, finalEmailList, {event_link: `http://localhost:3000/event/view/${eventId}?email=`, subject:"Your invited to a fun event!", event_name: eventInfo.title})
        });
    }

    public async send(fromEmail: string, toEmails: string[], content: any ): Promise<any> {
        try {
            let toEmailList: IEmail[] = [];
            toEmails.forEach((toEmail) => {
                toEmailList.push({email: toEmail});
            });

            this.options.body = {
                from: {email: fromEmail},
                personalizations: [{
                    to: [{email: fromEmail}],
                    bcc: toEmailList,
                    dynamic_template_data: content
                }],
                template_id: emailConfig.sendgridTemplateId
            };

            // call sendgrid to send the email
            await requestPromise(this.options);
        }
        catch (error) {
            console.log(error);
        }
    }



}
