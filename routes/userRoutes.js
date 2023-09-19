import express from "express";
import {
  LoginUser,
  LogoutUser,
  UserRegistration,
  GetUser,
} from "../controller/userController.js";
import { CheckCookie } from "../middleware/CookieCheck.js";

const route = express.Router();
route.get("/user/details", GetUser);
route.post("/user/register", UserRegistration);
route.post("/user/login", LoginUser);
route.post("/user/logout", CheckCookie, LogoutUser);

export default route;
