import express from "express";
import {
  LoginUser,
  LogoutUser,
  UserRegistration,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user/register", UserRegistration);
route.post("/user/login", LoginUser);
route.post("/user/logout", LogoutUser);

export default route;
