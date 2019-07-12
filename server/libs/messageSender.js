const twilio = require('twilio');
var dotenv = require('dotenv');
const logger = require('./logger');
dotenv.load();

exports.send = (message, number) => {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: message,
            from: process.env.NUMBER_PROVIDER,
            to: number
        })
        .then(message => logger.info(message.sid))
}