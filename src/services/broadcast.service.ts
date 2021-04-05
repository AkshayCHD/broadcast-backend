import ActiveBroadcast from '../models/active.broadcast.model'
import BroadcastHistory from '../models/broadcast.history.model'
import SocketError from '../utils/SocketError'
import { IAddBroadcastBody, ILeaveBroadcastBody, IGetActiveBroadcastsBody } from '../interfaces/broadcast.interface'
import getToken from '../agora/index.js'
import { generateString } from '../utils/commonFunctions'

const addBroadcast = async (body : IAddBroadcastBody) => {
	const { userId } = body;
	const activeBroadcast = await ActiveBroadcast.findOne({ user: userId });
	if(activeBroadcast) {
		throw new SocketError("There is already a broadcast active.", 400)
	}
	const roomName = generateString(10);
	const { token, channel, uid, appId } = getToken({ channel: roomName })
	await new ActiveBroadcast({
		user: userId,
		channelName: channel
	}).save();
	return { token, channel, uid, appId }
}

const leaveBroadcast = async (body: ILeaveBroadcastBody) => {
	const { userId } = body;
	const activeBroadcast = await ActiveBroadcast.findOne({ user: userId });
	if(!activeBroadcast) {
		throw new SocketError("No active broadcast found", 400);
	}
	await ActiveBroadcast.findOneAndDelete({ user: userId });
	return { channel: activeBroadcast.channelName }
}

const getActiveBroadcasts = async (body: IGetActiveBroadcastsBody) => {
	const { limit, skip } = body;
	const activeBroadcasts = await ActiveBroadcast.find().limit(limit).skip(skip);
	return activeBroadcasts
}

const joinBroadcast = async (body: IAddBroadcastBody) => {
	const { userId } = body
	const activeBroadcast = await ActiveBroadcast.findOne({ user: userId });
	if(!activeBroadcast) {
		throw new SocketError("No broadcast found with the socket id", 400);
	}
	const { token, channel, appId, uid } = getToken({ channel: activeBroadcast.channelName })
	return { token, channel, appId, uid }
}

export default {
	addBroadcast,
	leaveBroadcast,
	getActiveBroadcasts,
	joinBroadcast
}
