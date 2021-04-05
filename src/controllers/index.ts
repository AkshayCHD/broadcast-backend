
 
import express from "express";

import authController from "./auth.controller";
import broadcastController from './broadcast.controller'
const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

router.use("/auth", authController);
router.use("/broadcast", broadcastController);

export default router;
