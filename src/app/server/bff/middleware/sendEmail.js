import AmazonSES from 'aws-sdk/clients/ses';
import logger from '../../../../logger';

const awsCredentials = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: 'us-east-1'
};

export default async function sendEmail(req, res) {
    try {
        const { fromEmail, toEmail, message } = req.query;
        const { senderName, senderEmail } = req.app.locals.config.listings;
        // This address must be verified with Amazon SES.
        const senderDetails = `${senderName} <${senderEmail}>`;

        const useTestEmail = req.app.locals.config.isFeatureEnabled('listingsEmailTest');
        const recipient = useTestEmail ? req.app.locals.config.listings.testToEmail : toEmail;
        const replyTo = `${fromEmail}`;

        const subject = 'Message from contact form on Homes To Love Directory Listing';
        // The email body for recipients with non-HTML email clients.
        const bodyText = `Message from: ${fromEmail}.\r\n ${message}`;

        const bodyHtml = `<html>
        <head></head>
        <body>
          <p>Message from: ${fromEmail}</p>
          <p>${message}</p>
        </body>
        </html>`;

        const charset = 'UTF-8';
        const ses = new AmazonSES(awsCredentials);
        const params = {
            Source: senderDetails,
            Destination: {
                ToAddresses: [recipient]
            },
            ReplyToAddresses: [replyTo],
            Message: {
                Subject: {
                    Data: subject,
                    Charset: charset
                },
                Body: {
                    Text: {
                        Data: bodyText,
                        Charset: charset
                    },
                    Html: {
                        Data: bodyHtml,
                        Charset: charset
                    }
                }
            }
        };

        ses.sendEmail(params, err => {
            if (err) {
                logger.error(err);

                res.body = {
                    ...res.body,
                    contactForm: {
                        sendSuccessStatus: false,
                        message: 'There was an issue sending your message. Please try again.'
                    }
                };

                res.status(200).json(res.body);
            } else {
                res.body = {
                    ...res.body,
                    contactForm: {
                        sendSuccessStatus: true,
                        message: 'Thank you for contacting us. We will be in touch shortly.'
                    }
                };

                res.status(200).json(res.body);
            }
        });
    } catch (err) {
        if (err.statusCode !== 404) {
            logger.error(err);
        }

        res.body = {
            ...res.body,
            contactForm: {
                sendSuccessStatus: false,
                message: 'There was an issue sending your message. Please try again.'
            }
        };

        res.status(err.statusCode).json(res.body);
    }
}
