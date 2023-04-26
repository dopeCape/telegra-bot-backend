import { Router } from "express";
import {
  handleAllowUsers,
  handleGetConfig,
  handleNotifyAllUsers,
  handleStop,
  handleUpdates,
} from "../controller/config.controller.js";

let configRouter = new Router();

configRouter.get("/", handleGetConfig);
configRouter.get("/updates", handleUpdates);
configRouter.get("/allowusers", handleAllowUsers);
configRouter.get("/notify", handleNotifyAllUsers);
configRouter.get("/stop", handleStop);

export { configRouter };
