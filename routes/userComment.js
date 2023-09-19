import express from "express";
import {
  CreateComment,
  DeleteComment,
  EditComment,
  getComment,
} from "../controller/commentController.js";
import {
  AddReply,
  DeleteReply,
  EditReply,
} from "../controller/replyController.js";
import { LikeVideo } from "../controller/likeDislike.js";

const croute = express.Router();

croute.get("/allcomment/:id", getComment);
croute.post("/create/comment", CreateComment);
croute.put("/edit/comment/:id", EditComment);
croute.delete("/delete/comment/:id", DeleteComment);

croute.post("/add/reply/:id", AddReply);
croute.put("/edit/reply/:id", EditReply);
croute.delete("/delete/reply/:id", DeleteReply);

croute.post("/like/:user/:comment", LikeVideo);

export default croute;
