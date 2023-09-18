import { CommentModel } from "../model/commentSchema.js";
import { UserModel } from "../model/userSchema.js";

export const CreateComment = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      message: "UserId is required",
    });
  }
  const findUser = await UserModel.findOne({
    _id: userId,
  });
  if (!findUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  console.log(findUser.username);
  const create = CommentModel.create({
    userId: req.body.userId,
    username: findUser.username,
    comment: req.body.comment,
    likes: req.body.likes || 0,
    dislikes: req.body.dislikes || 0,
  });
  return res.status(201).json({
    message: "Comment created sucessfully",
    create,
  });
};
export const getComment = async (req, res) => {
  try {
    const data = await CommentModel.find({});
    return res.status(200).json({
      sucess: true,
      data,
    });
  } catch (error) {}
};
export const EditComment = () => {};
export const DeleteComment = () => {};
