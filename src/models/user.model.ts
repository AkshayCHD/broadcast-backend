import mongoose from "mongoose";
import UserInterface from "../interfaces/mongoose/user.interface";

const UserSchema = new mongoose.Schema(
	{
		deviceId: { type: String, default: "" },
		name: { type: String, default: "" },
		profileImage: {
			id: String,
			url: String,
			default: "",
		},
		email: { type: String, unique: true, index: true, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<UserInterface>("User", UserSchema);
