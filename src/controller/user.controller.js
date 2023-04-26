import { blockUser, getAllUsers } from "../module/user.module.js";

async function handelGetAllUsers(req, res, next) {
  try {
    let users = await getAllUsers();
    res.send(users);
    res.status(200);
  } catch (error) {
    next(error);
  }
}
async function handleBlockUser(req, res, next) {
  let userid = req.body.data.userId;

  try {
    let user = await blockUser(userid);

    res.send(user);
    res.status(200);
  } catch (error) {
    next(error);
  }
}
export { handelGetAllUsers, handleBlockUser };
