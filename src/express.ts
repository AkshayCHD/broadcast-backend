
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import methodOverride from "method-override";
import routes from "./controllers/index";

const app = express();

app.use(cors());

app.get("/api/health-check", (req, res) => res.send("OK"));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* method-override Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it. */
app.use(methodOverride());

// // secure apps by setting various HTTP headers
app.use(helmet());

app.use("/api", routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log("This is a general error handler", error);
	console.log(typeof req, typeof res, typeof next);
	res.send(error.message);
});

export default app;
