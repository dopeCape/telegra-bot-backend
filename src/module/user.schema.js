import mongoose, { Schema } from "mongoose";

const user = new Schema({
  username: String,
  userId: String,
  iphones: [],
  blocked: Boolean,
  removed: Boolean,
});

const iphones = new Schema({
  active: Boolean,
  iphone: String,
  price: Number,
});

const config = new Schema({
  allowSendUpdates: Boolean,
  allowUsersToCheck: Boolean,
  stopped: Boolean,
});

export { user, iphones, config };
