import { CommentModel } from "../model/commentSchema.js";

export class ReplyComment {
  constructor(commentId, userId, username, comment, likes, dislikes) {
    this.commentId = commentId;
    this.userId = userId;
    this.username = username;
    this.comment = comment;
    this.likes = likes;
    this.dislikes = dislikes;
  }
  async findAndReply() {
    // console.log(this.commentId);
    const findcomment = await CommentModel.findOne({
      _id: this.commentId,
    });
    if (!findcomment) {
      //   console.log("hello");
      const find = await CommentModel.findOne({
        $or: [
          { "replies._id": this.commentId },
          { "replies.replies._id": this.commentId },
        ],
      });
      if (!find) {
        return "CommentId not found!!";
      } else {
        console.log("hello");
        // console.log(find);
        const comments = [];
        for (let comment of find.replies) {
          if (comment._id.toString() === this.commentId.toString()) {
            // comments.push(comment);
            console.log(comment.replies);
            const newReply = new CommentModel({
              userId: this.userId,
              username: this.username,
              comment: this.comment,
              likes: this.likes || 0,
              dislikes: this.dislikes || 0,
            });
            comment.replies.push(newReply);
            await find.save();
            return "Reply sucessfully!!";
          }
        }
        return comments;
      }
    } else {
      //   console.log(findcomment);
      const newReply = new CommentModel({
        userId: this.userId,
        username: this.username,

        comment: this.comment,
        likes: this.likes || 0,
        dislikes: this.dislikes || 0,
      });
      findcomment.replies.push(newReply);
      await findcomment.save();
      return "Reply sucessfully!!";
    }
  }
}
