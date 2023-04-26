import { Router } from "express";
import {
  handelGetAllUsers,
  handleBlockUser,
} from "../controller/user.controller.js";

let useRouter = new Router();

useRouter.get("/", handelGetAllUsers);
useRouter.post("/block", handleBlockUser);

export { useRouter };
