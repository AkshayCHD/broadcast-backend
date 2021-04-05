import { body, validationResult, query } from 'express-validator';
import ActiveBroadcast from "../models/active.broadcast.model";
import broadcastService from '../services/broadcast.service';
import express from "express";


const router = express.Router();

router.get(
	"/",
	query('limit').optional().isInt(),
	query('skip').optional().isInt(),
	async (request: express.Request, response: express.Response, next) => {
		try {
			console.log(request.body);
			const { limit = 20, skip = 0 } = request.query
			const activeBroadcasts = await broadcastService.getActiveBroadcasts({ limit: Number(limit), skip: Number(skip) });
			response.status(200).json({ activeBroadcasts })
		} catch (error) {
			next(error);
		}
	}
);

export default router;
