import express from "express";
import route from "./routes/userRoutes.js";
import Connectdb from "./database/Db.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import croute from "./routes/userComment.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1", route);
app.use("/api/v1", croute);
app.use(cookieparser());

dotenv.config();
app.listen(4000, () => {
  Connectdb();
  console.log("server is running");
});
