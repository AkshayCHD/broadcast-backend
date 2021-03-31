const express = require('express');

const app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
const getToken = require('./agora/index')
io.on('connection', (socket) => {
    console.info(`Socket connected `); // eslint-disable-line no-console
    socket.on('get_token', (data, getTokenAcknowledgement) => {
        console.log("Get token", data)
        const { token, channel, appId, uid } = getToken({ channel: data.channel })
        console.log({ token, channel, appId, uid })
        getTokenAcknowledgement({ token, channel, appId, uid })
    })
});

server.listen(3030, () => {
    console.log("Server started listening")
});