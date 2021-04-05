import broadcastService from '../services/broadcast.service'
import errorEmitter from '../utils/errorEmitter'
import ISocketInstance, { IIO } from '../interfaces/socket/socket.interface'

const attachSocketEvents = (socket: ISocketInstance, io: IIO) => {
	socket.on("disconnecting", async () => {
		try {
			console.log("disconnecting event", socket.user._id)
			const { channel } = await broadcastService.leaveBroadcast({ userId: socket.user._id });
			socket.broadcast.emit("broadcast_over", {
				status: 200,
				data: {
					channel: channel,
					userId: socket.user._id
				}
			});
			socket.leave(channel)
		} catch(error) {
			errorEmitter(socket, error, "disconnecting event")
		}
	})
}

export default attachSocketEvents
