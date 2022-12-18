import { Router } from "express";
import { killAppControl } from "../controllers/killapp.controller.js";
const killAppRouter = Router();

killAppRouter.post("/", killAppControl);

export default killAppRouter;
