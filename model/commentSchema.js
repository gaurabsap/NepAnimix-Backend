import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersdata",
      required: true,
    },
    username: {
      type: String,
      ref: "usersdata",
      required: true,
    },
    photo: {
      type: String,
      default: "https://wallpapercave.com/wp/wp6663778.jpg",
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersdata",
      required: true,
    },
    username: {
      type: String,
      ref: "usersdata",
      required: true,
    },
    photo: {
      type: String,
      default: "https://wallpapercave.com/wp/wp6663778.jpg",
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    replies: [ReplySchema],
  },
  {
    timestamps: true,
  }
);

const MainCommentSchema = new mongoose.Schema({
  AnimeId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersdata",
    required: true,
  },
  username: {
    type: String,
    ref: "usersdata",
    required: true,
  },
  photo: {
    type: String,
    default: "https://wallpapercave.com/wp/wp6663778.jpg",
  },
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  replies: [CommentSchema],
});

export const CommentModel = mongoose.model("comments", MainCommentSchema);
