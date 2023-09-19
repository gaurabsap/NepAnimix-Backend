import jwt from "jsonwebtoken";
import { UserModel } from "../model/userSchema.js";

export const CheckCookie = async (resq, resp, next) => {
  console.log(resq.headers);
  try {
    jwt.verify(String(neptoken), process.env.SECRET, (err, datas) => {
      if (err) {
        return resp.status(404).json({
          sucess: false,
          message: "Unauthorized User",
        });
      } else {
        UserModel.findOne({ _id: datas.id })
          .then((data) => {
            if (!data) {
              return resp.status(404).json({
                sucess: false,
                message: "Error",
              });
            } else {
              resq.id = datas.id;
              next();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
