import broadcastService from '../services/broadcast.service'
import errorEmitter from '../utils/errorEmitter'
import ISocketInstance, { IIO } from '../interfaces/socket/socket.interface'
import Joi from 'joi';
import eventValidator from '../utils/eventValidator';

// Input
export const JoinBroadcastSchema = Joi.object({
  userId: Joi.string().required(),
});

const attachBroadcaseEvents = (socket: ISocketInstance, io: IIO) => {
	socket.on("broadcast_video", async (data : any, broadcastSuccessAcknowledgement : Function) => {
		try {
			console.log("broadcast event", socket.user._id)
			const { token, channel, uid, appId } = await broadcastService.addBroadcast({ userId: socket.user._id });
			socket.join(channel)
			broadcastSuccessAcknowledgement({ token, channel, uid, appId });
		} catch(error) {
			errorEmitter(socket, error, "Join chat event")
		}
	})
	socket.on("leave_broadcast", async (data : any, broadcastSuccessAcknowledgement : Function) => {
		try {
			console.log("leave broadcast event", socket.user._id)
			const { channel } = await broadcastService.leaveBroadcast({ userId: socket.user._id });
			socket.broadcast.emit("broadcast_over", {
				status: 200,
				data: {
					channel: channel,
					userId: socket.user._id
				}
			});
			socket.leave(channel)
			broadcastSuccessAcknowledgement({ channel });
		} catch(error) {
			errorEmitter(socket, error, "Join chat event")
		}
	})
	socket.on('join_broadcast', async (data, joinBroadcastSuccessAcknowledgement) => {
		try {
			console.log("Join Broadcast", data)
			const { userId } = data.body
			eventValidator(JoinBroadcastSchema, { userId });
			const { token, channel, appId, uid } = await broadcastService.joinBroadcast({ userId })
			socket.join(channel);
			joinBroadcastSuccessAcknowledgement({ token, channel, appId, uid })
		} catch(error) {
			errorEmitter(socket, error, "Join broadcast error")
		}
    })
}

export default attachBroadcaseEvents
