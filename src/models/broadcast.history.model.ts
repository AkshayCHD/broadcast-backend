import mongoose from "mongoose";
import BroadcastHistoryInterface from "../interfaces/mongoose/broadcast.history.interface";
const Schema = mongoose.Schema;

const BroadcastHistorySchema = new mongoose.Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
		channelName: { type: String },
		broadcastDuration: { type: Number, default: 0 },
		giftsReceived: { type: Number, default: 0 },
		coinsReceived: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export default mongoose.model<BroadcastHistoryInterface>("BroadcastHistory", BroadcastHistorySchema);
