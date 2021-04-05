import User from "../models/user.model";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
	"/login",
	async (request: express.Request, response: express.Response, next) => {
		try {
			console.log(request.body);
			const { email, name } = request.body;
			console.log(email);
			let user = await User.findOne({ email });
			if (!user) {
				user = await new User({
					email: email,
					name: name
				}).save();
			}
			let token = jwt.sign(
				{
					_id: user._id,
				},
				"0a6b944d-d2fb-46fc-a85e-0295c986cd9f"
			);
			response.send({ token: token, user: user });
		} catch (error) {
			next(error);
		}
	}
);

export default router;
