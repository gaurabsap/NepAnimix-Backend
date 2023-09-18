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
      default:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
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
      default:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
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
    default:
      "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
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
