const dialogflow = require('apiai');
const uuidv1 = require('uuid/v1');
const dotenv = require('dotenv');
const messageSender = require('./messageSender');
dotenv.load();

const ai = dialogflow(process.env.ACCESS_TOKEN);
const AI_SESSION_ID = uuidv1();


const confirmationList = ['yes', 'ok', 'sure', 'I confirm', 'of course', 'okay', 'yeah'];

sendMessageIfIsComplete = (response) => {
    if (response.result.parameters && response.result.parameters.confirmation && confirmationList.indexOf(response.result.parameters.confirmation) != -1) {
        messageSender.send('transaction completed', response.result.parameters.phone);
    }
}



exports.instance = (text, onResponse) => {

    let aiRequester = ai.textRequest(text, {
        sessionId: AI_SESSION_ID
    });
    aiRequester.on('response', (response) => {        
        let message = response.result.fulfillment.speech;
        onResponse(message);
        sendMessageIfIsComplete(response);
    })

    aiRequester.on('error', (error) => {
        logger.error(error);
    })

    aiRequester.end();
    return aiRequester;
}