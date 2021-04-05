
import mongoose from 'mongoose'

export default interface User extends mongoose.Document {
	deviceId: String,
	name: String,
	profileImage: {
		id: String,
		url: String
  	},
	email: String
}
