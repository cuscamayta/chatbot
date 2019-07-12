'use strict';

module.exports = (app) => {
    app.use('/chatbot',require('./server/routes/chatbot'));
}