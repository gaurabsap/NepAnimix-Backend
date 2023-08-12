import { UserModel } from "../model/userSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const genCsrf = () => {
  return crypto.randomBytes(32).toString("hex");
};

const jwttoken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "7 days",
  });
};

const ComparePassword = async (newpass, old) => {
  return await bcrypt.compare(newpass, old);
};
export const UserRegistration = async (resq, resp) => {
  const { username, email, password } = resq.body;
  if (!username || !email || !password) {
    return resp.status(400).json({
      message: "Please provide full details",
    });
  }
  if (password.length < 6) {
    return resp.status(400).json({
      message: "Password length must be more than 6",
    });
  }
  try {
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return resp.status(400).json({
        message: "email already exist",
      });
    } else {
      const create = await UserModel.create(resq.body);
      if (create) {
        return resp.status(201).json({
          message: "User created successfully",
          create,
        });
      }
    }
  } catch (error) {
    // console.log("hited");
    console.log(error);
    if (error.name === "ValidationError") {
      return resp.status(400).json({
        message: "Provide valid email",
      });
    }
    if (error.code === 11000) {
      return resp.status(400).json({
        message: "Username already exist",
      });
    }
    return resp.status(500).send("Server error");
  }
};

export const LoginUser = async (resq, resp) => {
  const { email, password } = resq.body;
  if (!email || !password) {
    return resp.status(400).json({
      message: "Please provide full details",
    });
  }
  try {
    const check = await UserModel.findOne({ email });
    if (!check) {
      return resp.status(400).json({
        message: "Email not found",
      });
    } else {
      const csrftoken = genCsrf();

      const checkpass = await ComparePassword(password, check.password);
      if (checkpass) {
        const update = await UserModel.findByIdAndUpdate(
          { _id: check._id },
          {
            csrf: csrftoken,
          }
        );
        const jwt = jwttoken(update._id);
        resp.cookie("neptoken", jwt, {
          httpOnly: true,
          path: "/",
          expires: new Date(Date.now() + 7 * 86400),
          sameSite: "none",
          secure: true,
        });
        return resp.status(200).json({
          message: "Login sucessfully",
          data: {
            _id: update._id,
            username: update.username,
            email: update.email,
            csrf: update.csrf,
            createdAt: update.createdAt,
            updatedAt: update.updatedAt,
          },
          token: jwt,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).send("Server error");
  }
};

export const LogoutUser = (resq, resp) => {
  try {
    return resp.cookie("neptoken", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now(0)),
      sameSite: "none",
      secure: true,
    });
  } catch (error) {
    return resp.status(500).send("Server error");
  }
};
