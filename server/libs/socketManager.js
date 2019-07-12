const logger = require('./logger');
module.exports = (server, socketId, idReponse) => {
    const socketio = require('socket.io')(server);

    connect = (requestEvent) => {
        socketio.on('connection', (socket) => {
            socket.on(socketId, (text) => {
                logger.info('Message :'.concat(text));
                requestEvent(text, (messageResponse) => { socket.emit(idReponse, messageResponse); });
            });
        });
    }

    return {
        connect: connect
    };
};
