import {
  bot,
  changeDailyUpdates,
  changeSto,
  stopped,
  chnageAllowChekc,
} from "../index.js";
import { getConfig, updateConfig } from "../module/config.module.js";
import { sendMsg } from "./telegram.controller.js";

async function handleGetConfig(req, res, next) {
  try {
    let config = await getConfig();
    res.send(config);
    res.status(200);
  } catch (error) {
    next(error);
  }
}
async function handleUpdates(req, res, next) {
  try {
    let conf = await getConfig();

    conf.allowSendUpdates = !conf.allowSendUpdates;
    try {
      let config = await updateConfig(conf);
      res.send(config);

      changeDailyUpdates();
      res.status(204);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}
async function handleAllowUsers(req, res, next) {
  try {
    let conf = await getConfig();

    conf.allowUsersToCheck = !conf.allowUsersToCheck;
    try {
      let config = await updateConfig(conf);
      res.send(config);
      chnageAllowChekc();

      res.status(204);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

async function handleNotifyAllUsers(req, res, next) {
  try {
    await sendMsg(bot);
    res.send("notifyed");
    res.send(200);
  } catch (error) {
    next(error);
  }
}

async function handleStop(req, res, next) {
  try {
    let conf = await getConfig();

    conf.stopped = !conf.stopped;
    try {
      let config = await updateConfig(conf);
      changeSto();
      console.log(stopped);

      res.send(config);
      res.status(204);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

export {
  handleGetConfig,
  handleUpdates,
  handleAllowUsers,
  handleNotifyAllUsers,
  handleStop,
};
