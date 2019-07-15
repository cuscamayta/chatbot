const twilio = require('twilio');
var dotenv = require('dotenv');
const logger = require('./logger');
dotenv.load();

exports.send = (message, number) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_NUMBER,
            to: '+' + number
        })
        .then(message => logger.info(message.sid))
}