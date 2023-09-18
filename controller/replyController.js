import { CommentModel } from "../model/commentSchema.js";
import { ReplyComment } from "./reply.js";
import { UserModel } from "../model/userSchema.js";

export const AddReply = async (req, res) => {
  const { id } = req.params;
  const { userId, comment, likes, dislikes } = req.body;
  const user = await UserModel.findOne({
    _id: userId,
  });
  const reply = new ReplyComment(
    id,
    userId,
    user.username,
    comment,
    likes,
    dislikes
  );
  //   console.log(await reply.findAndReply());
  const msg = await reply.findAndReply();
  if (msg) {
    return res.status(201).json({
      message: msg,
    });
  }
};

export const EditReply = () => {};
export const DeleteReply = () => {};
