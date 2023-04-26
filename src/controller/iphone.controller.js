import { prices } from "../iphones.js";
import { getIphones, setIphoneStatus } from "../module/iphone.module.js";

function handleGetIphones(req, res, next) {
  let iphs = getIphones();

  res.send(iphs);
  res.status(200);
}

function handleSetIphoneStatus(req, res, next) {
  let iphone = req.body.data.iphone;
  let iph = setIphoneStatus(iphone);
  res.send(iph);
  res.status(204);
}

export { handleGetIphones, handleSetIphoneStatus };
