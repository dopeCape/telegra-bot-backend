import mongoose from "mongoose";
import { getIphoneCollection } from "../config/db.confing.js";
import { prices } from "../iphones.js";

async function updateIponePrice(iphone, price) {
  let coll;
  let ip;
  try {
    coll = await getIphoneCollection();
  } catch (error) {
    throw error;
  }
  try {
    ip = await getIphone(iphone);
    ip.price = price;
  } catch (error) {
    throw error;
  }

  try {
    let newIphone = await coll.findOneAndUpdate({ iphone: iphone }, ip);
    return newIphone;
  } catch (error) {
    throw error;
  }
}

async function updateIphoneStatus(iphone) {
  let coll;
  let ip;
  try {
    coll = await getIphoneCollection();
  } catch (error) {
    throw error;
  }
  try {
    ip = await getIphone(iphone);
    ip.active = !iphone.active;
  } catch (error) {
    throw error;
  }

  try {
    let newIphone = await coll.findOneAndUpdate({ iphone: iphone }, ip);
    return newIphone;
  } catch (error) {
    throw error;
  }
}

async function getIphone(iphone) {
  let coll;
  try {
    coll = await getIphoneCollection();
  } catch (error) {
    throw error;
  }

  try {
    let iphones = await coll.findOne({ iphone: iphone });
    return iphones;
  } catch (error) {
    throw error;
  }
}

function setIphoneStatus(iph) {
  prices[iph].active = !prices[iph].active;

  let iphs = Object.entries(prices);
  return iphs;
}

function getIphones() {
  let iphs = Object.entries(prices);

  console.log(iphs);

  return iphs;
}
export {
  getIphone,
  updateIponePrice,
  updateIphoneStatus,
  getIphones,
  setIphoneStatus,
};
