import mongoose from "mongoose";
import { getConfigCollection } from "../config/db.confing.js";

async function getConfig() {
  let coll;
  try {
    coll = await getConfigCollection();
  } catch (error) {
    throw error;
  }
  try {
    let config = await coll.find({});
    console.log(config);
    return config[0];
  } catch (error) {
    throw error;
  }
}

async function updateConfig(config) {
  let coll;
  let conf;
  try {
    coll = await getConfigCollection();
  } catch (error) {
    throw error;
  }
  try {
    conf = await getConfig();
  } catch (error) {
    throw error;
  }

  try {
    let updatedConfing = await coll.findOneAndUpdate(
      {
        allowSendUpdates: conf.allowSendUpdates,
      },
      config
    );
    return updatedConfing;
  } catch (error) {
    throw error;
  }
}

export { updateConfig, getConfig };
