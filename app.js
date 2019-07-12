'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const chatbotServer = require('./server/libs/chatbotServer');
const socketManager = require('./server/libs/socketManager')(server, 'chat request', 'ai response');
require('./routes')(app);

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 5000, () => {  
  console.log('listening on  port %d', server.address().port);
});

socketManager.connect(chatbotServer.instance)

