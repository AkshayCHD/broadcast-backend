import mongoose from "mongoose";
import ActiveBroadcastInterface from "../interfaces/mongoose/active.broadcast.interface";
const Schema = mongoose.Schema;

const ActiveBroadcastSchema = new mongoose.Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', index: true, unique: true, required: true },
		channelName: { type: String, unique: true },
		broadcastDuration: { type: Number, default: 0 },
		giftsReceived: { type: Number, default: 0 },
		coinsReceived: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export default mongoose.model<ActiveBroadcastInterface>("ActiveBroadcast", ActiveBroadcastSchema);
