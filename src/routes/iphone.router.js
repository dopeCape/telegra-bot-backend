import { Router } from "express";
import {
  handleGetIphones,
  handleSetIphoneStatus,
} from "../controller/iphone.controller.js";

let iphoneRouter = new Router();

iphoneRouter.get("/", handleGetIphones);
iphoneRouter.post("/status", handleSetIphoneStatus);

export { iphoneRouter };
