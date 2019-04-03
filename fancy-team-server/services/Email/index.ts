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
        console.log(usersToEmail);
        return EventService.findEvent(eventId).then(eventInfo => {
            console.log(eventInfo);
            return this.send(eventInfo.organizerEmail, usersToEmail, {event_link: `http://localhost:3000/event/edit/${eventId}`, event_name: eventInfo.title})
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
                    to: toEmailList,
                    dynamic_template_data: content
                }],
                template_id: emailConfig.sendgridTemplateId
            };
            

            console.log(this.options);

            await requestPromise(this.options); // call sendgrid to send the email

        }
        catch (error) {

        }
    }



}
