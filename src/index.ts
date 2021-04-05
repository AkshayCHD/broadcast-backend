import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server, Socket } from 'socket.io'
import http from 'http';
import authMiddleware from "./middlewares/socket/auth.middleware";
import attachBroadcaseEvents from './handlers/broadcast.handler'
// const getToken = require('./agora/index')
import app from "./express";
 
const server = http.createServer(app);

var io = new Server(server);
const mongoUri =
	"mongodb+srv://dbUser:DbUserAppyhigh@cluster0.tplqv.mongodb.net/test?authSource=admin&replicaSet=atlas-10bgba-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.on("connected", async function () {
	console.log(`Connected to ${mongoUri} at ${new Date().toISOString()}`);
});

mongoose.connection.on("error", () => {
	throw new Error(`unable to connect to database: ${mongoUri}`);
});

// const getToken = require('./agora/index')
// io.on('connection', (socket: Socket) => {
//     console.info(`Socket connected `); // eslint-disable-line no-console
//     socket.on('get_token', (data, getTokenAcknowledgement) => {
//         console.log("Get token", data)
//         const { token, channel, appId, uid } = getToken({ channel: data.channel })
//         console.log({ token, channel, appId, uid })
//         getTokenAcknowledgement({ token, channel, appId, uid })
//     })
// });

io.use(authMiddleware);
io.on("connection", function (socket: any) {
	console.log("a user connected");
	attachBroadcaseEvents(socket, io)
	// attachAnonymousChatEvents(socket, io);
	// attachConnectionEvents(socket, io);
	// attachMessageHandlingEvent(socket, io);
});

server.listen(1133, () => {
    console.log("Server started listening")
});
