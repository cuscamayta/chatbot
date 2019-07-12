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

// const accountSid = 'AC64ed4254bc0dcf9753419d49893d6b88';
// const authToken = 'e036d30e3d417ae2fe9faa27643b1314';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+19734594001',
//      to: '+59160023359'
//    })