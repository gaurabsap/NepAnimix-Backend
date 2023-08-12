import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide Username"],
      unique: true,
      trim: true,
      maxlength: [20, "Username should be less than or equal to 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide valid email",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      minlength: [6, "password Should Be At Least Three Characters"],
    },
    photo: {
      type: String,
      default:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
    },
    csrf: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }
  const hashpass = await bcrypt.hash(this.password, 10);
  this.password = hashpass;
});

export const UserModel = mongoose.model("Userdata", userSchema);
