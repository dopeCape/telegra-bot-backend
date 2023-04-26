import mongoose from "mongoose";
import { config, iphones, user } from "../module/user.schema.js";
import * as dotenv from "dotenv";

dotenv.config();

let DB;
let uri = process.env.URI;

async function connectDb() {
  try {
    DB = await mongoose.connect(uri);
  } catch (error) {
    throw error;
  }
}

function getDb() {
  return DB;
}

async function getUserCollection() {
  try {
    let coll = await DB.model("botuser", user);
    return coll;
  } catch (error) {
    throw error;
  }
}

async function getIphoneCollection() {
  try {
    let coll = await DB.model("iphones", iphones);
    return coll;
  } catch (error) {
    throw error;
  }
}

async function getConfigCollection() {
  try {
    let coll = await DB.model("config", config);
    return coll;
  } catch (error) {}
}

export {
  connectDb,
  getDb,
  getUserCollection,
  getConfigCollection,
  getIphoneCollection,
};
