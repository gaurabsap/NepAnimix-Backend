import { CommentModel } from "../model/commentSchema.js";
import { UserModel } from "../model/userSchema.js";

export const CreateComment = async (req, res) => {
  const { AnimeId, userId, comment } = req.body;
  if (!userId || !AnimeId || !comment) {
    return res.status(400).json({
      message: "Provide full details ",
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
  const data = await CommentModel.create({
    userId: req.body.userId,
    AnimeId: req.body.AnimeId,
    username: findUser.username,
    comment: req.body.comment,
    likes: req.body.likes || 0,
    dislikes: req.body.dislikes || 0,
  });
  const sortedComments = await CommentModel.find({ AnimeId }).sort({
    timestampField: -1,
  });

  const newlyAddedComment = sortedComments[0];
  return res.status(201).json({
    message: "Comment created sucessfully",
    data,
  });
};
export const getComment = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await CommentModel.find({
      AnimeId: id,
    });
    return res.status(200).json({
      sucess: true,
      data,
    });
  } catch (error) {}
};
export const EditComment = () => {};
export const DeleteComment = () => {};
