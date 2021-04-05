
import mongoose from 'mongoose'

export default interface ActiveBroadcast extends mongoose.Document {
	user: string,
	channelName: string,
	broadcastDuration: Number,
	giftsReceived: Number,
	coinsReceived: Number,
}
