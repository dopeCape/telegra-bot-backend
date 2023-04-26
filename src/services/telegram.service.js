import {
  getIphones,
  suscribe,
  unsus,
  userExistes,
} from "../controller/telegram.controller.js";
import { allowToCheck, stopped } from "../index.js";
import { contains } from "../utils/helper.js";

export function telegram_service(bot) {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    const username = msg.from.first_name;
    const userid = msg.from.id;
    if (!stopped) {
      if (msg.text == "/help") {
        bot.sendMessage(
          chatId,
          `/help to list all commands\n/list to list all avaliable iphones\n/sus <iphone> to suscribe to a iphone eg. /sus 14\n/unsus <iphone> to unsuscribe to a iphone eg. /unsus 14.\n/price to list prices of suscribed iphones\n/suslist to list iphones suscribed`
        );
      }
      if (msg.text == "/list") {
        bot.sendMessage(
          chatId,
          "Iphone 14\nIphone 13\nIphone 12\nIphone 11\nIphone X\nIphone SE"
        );
      }
      if (msg.text == "/start") {
        try {
          let user = await userExistes(userid, username);
          bot.sendMessage(
            chatId,
            `/help to list all commands\n/list to list all avaliable iphones\n/sus <iphone> to suscribe to a iphone eg. /sus 14\n/unsus <iphone> to unsuscribe to a iphone eg. /unsus 14.\n/price to list prices of suscribed iphones\n/suslist to list iphones suscribed`
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (msg.text == "/price") {
        try {
          let ips;
          if (allowToCheck) {
            ips = await getIphones(userid, username);
          } else {
            ips = "Admin has stoped this feature ";
          }

          bot.sendMessage(chatId, ips);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      bot.sendMessage(chatId, "Admin has stopped the bot");
    }
    // send a message to the chat acknowledging receipt of their message
    console.log(chatId);
    console.log(msg);
  });

  bot.onText(/\/sus (.+)/, async (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    let iphones = ["14", "13", "12", "11", "x", "se"];
    const chatId = msg.chat.id;
    const userid = msg.from.id;
    const resp = match[1]; // the captured "whatever"
    console.log(contains(iphones, "14"));
    const username = msg.from.first_name;
    if (!contains(iphones, resp)) {
      bot.sendMessage(chatId, "Invalid iphone,/list to list iphones,");
    } else {
      try {
        let m = await suscribe(userid, resp, username);
        bot.sendMessage(chatId, m);
      } catch (error) {
        console.log(error);
      }
    }
    // send back the matched "whatever" to the chat
  });
  bot.onText(/\/unsus (.+)/, async (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const userid = msg.from.id;
    let iphones = ["14", "13", "12", "11", "x", "se"];
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    const username = msg.from.first_name;

    if (!contains(iphones, resp)) {
      bot.sendMessage(chatId, "Invalid iphone,/list to list iphones,");
    } else {
      try {
        let m = await unsus(userid, resp, username);
        bot.sendMessage(chatId, m);
      } catch (error) {
        console.log(error);
      }
    }

    // send back the matched "whatever" to the chat
  });
}
