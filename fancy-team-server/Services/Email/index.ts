import requestPromise from 'request-promise';
import * as emailConfig from "../../config/email-config.json";
import {IEmail, IEmailOptions} from "../../common/external";


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

            await requestPromise(this.options); // call sendgrid to send the email

        }
        catch (error) {

        }
    }



}
