import mongoose from "mongoose";
import { getUserCollection } from "../config/db.confing.js";
async function getAllUsers() {
  let coll;

  try {
    coll = await getUserCollection();
  } catch (error) {
    throw error;
  }
  try {
    let users = await coll.find({});
    return users;
  } catch (error) {
    throw error;
  }
}

async function blockUser(userId) {
  let coll;
  let user;

  try {
    coll = await getUserCollection();
  } catch (error) {
    throw error;
  }
  try {
    user = await getUser(userId);
  } catch (error) {
    throw error;
  }
  user = {
    ...user,
    blocked: !user.blocked,
  };

  console.log(user.blocked);

  try {
    await coll.findOneAndUpdate({ userId: userId }, { blocked: user.blocked });
    try {
      let updatedUser = await getUser(userId);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function createUse(userId, username) {
  let coll;

  try {
    coll = await getUserCollection();
  } catch (error) {
    throw error;
  }
  try {
    let user = await coll.create({
      username: username,
      userId: userId,
      blocked: false,
      removed: false,
    });
  } catch (error) {
    throw error;
  }
}
async function getUser(userId) {
  let coll;

  try {
    coll = await getUserCollection();
  } catch (error) {
    throw error;
  }

  try {
    let user = await coll.findOne({ userId: userId });

    return user;
  } catch (error) {
    throw error;
  }
}

async function addUserIphone(userId, iphones) {
  let coll;
  let user;
  try {
    coll = await getUserCollection();
  } catch (error) {
    throw error;
  }

  try {
    let updatedUser = await coll.findOneAndUpdate(
      { userId: userId },
      { iphones: iphones }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function removeUserIphone(userId, iphone) {
  let coll;
  let user;
  try {
    coll = await getUserCollection();
  } catch (error) {
    throw error;
  }
  try {
    user = await getUser(userId);
    user = user.iphones.filter((item) => {
      return item != iphone;
    });
  } catch (error) {
    throw error;
  }

  try {
    let updatedUser = await coll.findOneAndUpdate({ userId: userId }, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export {
  getUser,
  createUse,
  removeUserIphone,
  blockUser,
  addUserIphone,
  getAllUsers,
};
