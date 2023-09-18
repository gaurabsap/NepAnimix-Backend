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

const croute = express.Router();

croute.get("/allcomment", getComment);
croute.post("/create/comment", CreateComment);
croute.put("/edit/comment/:id", EditComment);
croute.delete("/delete/comment/:id", DeleteComment);

croute.post("/add/reply/:id", AddReply);
croute.put("/edit/reply/:id", EditReply);
croute.delete("/delete/reply/:id", DeleteReply);

export default croute;
