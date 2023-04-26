import { stopped } from "../index.js";
import { prices } from "../iphones.js";
import {
  addUserIphone,
  createUse,
  getAllUsers,
  getUser,
} from "../module/user.module.js";
import { contains, remove } from "../utils/helper.js";

async function suscribe(userid, iphone, username) {
  try {
    let user = await userExistes(userid, username);
    let iphones = user.iphones;
    if (!contains(iphones, iphone)) {
      iphones.push(iphone);
    } else {
      return " already suscribed to this iphone  ";
    }
    try {
      let newUserData = await addUserIphone(userid, iphones);
      return `suscribed to Iphone ${iphone}`;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function unsus(userid, iphone, username) {
  let updatediphone;
  try {
    let user = await userExistes(userid, username);
    console.log(user);

    let iphones = user.iphones;
    if (!contains(iphones, iphone)) {
      return `U have not suscribed to Iphone ${iphone}`;
    } else {
      updatediphone = remove(iphones, iphone);
    }
    try {
      let newUserData = await addUserIphone(userid, updatediphone);
      return "unsuscribed to Iphone " + iphone;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function userExistes(userid, username) {
  let user;
  try {
    user = await getUser(userid);
  } catch (error) {
    throw error;
  }
  if (user == null) {
    try {
      let user = await createUse(userid, username);
      return user;
    } catch (error) {
      throw error;
    }
  } else {
    return user;
  }
}

async function getIphones(userid, username) {
  let ips = "";
  try {
    let user = await userExistes(userid, username);
    let iphones = user.iphones;

    if (!user.blocked) {
      iphones.forEach((i, k) => {
        if (prices[i].active) {
          ips = ips + `Iphone ${i}:${prices[i].price}\n`;
        } else {
          ips = ips + `Iphone ${i}:blocked by admin\n`;
        }
      });
    } else {
      ips = "Admin has blocked you";
    }

    return ips;
  } catch (error) {
    throw error;
  }
}

async function sendMsg(bot) {
  try {
    let users = await getAllUsers();

    users.forEach(async (x) => {
      try {
        let ips = await getIphones(x.userId);

        if (!stopped) {
          await bot.sendMessage(x.userId, ips);
        } else {
          bot.sendMessage(x.userId, "Admin has stopped the bot");
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    throw error;
  }
}
export { userExistes, unsus, suscribe, getIphones, sendMsg };
