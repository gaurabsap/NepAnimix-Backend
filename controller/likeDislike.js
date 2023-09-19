import { CommentModel } from "../model/commentSchema.js";

export const LikeVideo = async (req, res) => {
  const { user, comment } = req.params;
  if (!user || !comment) {
    return res.status(400).json({
      message: "Id is required!!",
    });
  }
  try {
    const find = await CommentModel.find({
      userId: user,
    });
    if (!find) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    for (const obj of find) {
      //   console.log(obj._id.toString());
      if (obj._id.toString() === comment.toString()) {
        obj.likes += 1;
        await obj.save();
        return res.status(200).json({
          message: "liked",
        });
      } else {
        // console.log("xaina");
        if (obj.replies.length > 0) {
          for (const another of obj.replies) {
            if (another._id.toString() === comment.toString()) {
              console.log("vete");
              another.likes += 1;
              await another.save();
              return res.status(200).json({
                message: "liked",
              });
            } else {
              if (another.replies.length > 0) {
                for (const nested of another.replies) {
                  if (nested._id.toString() === comment.toString()) {
                    // console.log("vete");
                    another.likes += 1;
                    await nested.save();
                    return res.status(200).json({
                      message: "liked",
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Server error",
    });
  }
};
