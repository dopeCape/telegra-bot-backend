import Express from "express";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import * as cron from "node-cron";

import * as dotenv from "dotenv";

import morgan from "morgan";

import { telegram_service } from "./services/telegram.service.js";
import { connectDb } from "./config/db.confing.js";
import { sendMsg } from "./controller/telegram.controller.js";
import { useRouter } from "./routes/user.router.js";
import { configRouter } from "./routes/config.router.js";
import { getConfig } from "./module/config.module.js";
import { iphoneRouter } from "./routes/iphone.router.js";

dotenv.config();
const app = Express();
const port = process.env.PORT || 8000;
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
export var stopped;
export var dailyUpdates;
export var allowToCheck;
export function chnageAllowChekc() {
  allowToCheck = !allowToCheck;
}
export function changeDailyUpdates() {
  dailyUpdates = !dailyUpdates;
}

export function changeSto() {
  stopped = !stopped;
}

telegram_service(bot);
app.use(cors());
app.use(Express.json());
app.use(morgan(":method :url :status"));

app.use("/user", useRouter);
app.use("/config", configRouter);
app.use("/iphone", iphoneRouter);
try {
  await connectDb();
  cron.schedule("* * * * *", () => {
    console.log("runnign");
    if (dailyUpdates) {
      sendMsg(bot);
    }

    // sendMsg(bot);
  });
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, async () => {
  console.log("listning on port:", port);
  try {
    let res = await getConfig();
    dailyUpdates = res.allowSendUpdates;
    allowToCheck = res.allowUsersToCheck;

    stopped = res.stopped;
  } catch (error) {
    console.log(error);
  }
});

export { bot };
