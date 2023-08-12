import express from "express";
import route from "./routes/userRoutes.js";
import Connectdb from "./database/Db.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
// import { ErrorHandle } from "./middleware/errorHandle.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", route);
app.use(cookieparser());
// app.use(ErrorHandle);
dotenv.config();
app.listen(4000, () => {
  Connectdb();
  console.log("server is running");
});
