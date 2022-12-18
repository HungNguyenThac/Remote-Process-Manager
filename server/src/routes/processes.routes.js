import { Router } from "express";
import { processesControl } from "../controllers/processes.controller.js";
const processesRouter = Router();

processesRouter.get("/", processesControl);

export default processesRouter;
