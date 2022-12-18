import { Router } from "express";
import { applicationsControl } from "../controllers/applications.controller.js";
const applicationsRouter = Router();

applicationsRouter.get("/", applicationsControl);

export default applicationsRouter;
