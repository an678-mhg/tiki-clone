import { Router } from "express";
import sendMessage from "../utils/sendMessage";
import argon2 from "argon2";
import usersModel from "../models/users.model";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken";
import passport from "passport";

const routers = Router();

// @POST
// Sign up users
// /api/auth/sign-up
routers.post("/sign-up", async (req, res) => {
  try {
    const { email, username, password, avatar } = req.body;

    if (!email || !username || !password || !avatar) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số !"));
    }

    const existUser = await usersModel.findOne({ email });
    if (existUser) {
      return res.status(400).json(sendMessage(false, "Email này đã tồn tại!"));
    }

    const hashPassword = await argon2.hash(password);
    const newUser = new usersModel({
      username,
      email,
      password: hashPassword,
      avatar: avatar,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT as string, {
      expiresIn: "12h",
    });

    res
      .status(203)
      .json({ ...sendMessage(true, "Tạo tài khoản thành công"), token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @POST
// Sign in users
// /api/auth/sign-in
routers.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số!"));
    }

    const existUser = await usersModel.findOne({ email });
    console.log(existUser);
    if (!existUser) {
      return res
        .status(400)
        .json(
          sendMessage(
            false,
            "Email hoặc mật khẩu bị sai xin vui lòng kiểm tra lại!"
          )
        );
    }

    const verifyPassword = await argon2.verify(existUser.password, password);
    if (!verifyPassword) {
      return res
        .status(400)
        .json(
          sendMessage(
            false,
            "Email hoặc mật khẩu bị sai xin vui lòng kiểm tra lại!"
          )
        );
    }

    const token = jwt.sign(
      { userId: existUser._id },
      process.env.JWT as string,
      { expiresIn: "12h" }
    );

    res.json({ ...sendMessage(true, "Đăng nhập thành công!"), token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a user info
// private
// /api/auth
routers.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    const userInfo = await usersModel
      .findOne({ _id: userId })
      .select("-password");

    if (!userInfo) {
      return res
        .status(400)
        .json(sendMessage(false, "Người dùng không tồn tại!"));
    }

    res.json({
      ...sendMessage(true, "Lấy thông tin người dùng thành công!"),
      user: userInfo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Change password
// /api/auth/change-password
routers.put("/change-password", verifyToken, async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const existUser = await usersModel.findOne({ _id: userId });
    const verifyPasswordOld = await argon2.verify(
      existUser?.password as string,
      currentPassword
    );

    if (!verifyPasswordOld) {
      return res
        .status(400)
        .json(sendMessage(true, "Vui lòng kiểm tra lại mật khẩu cũ!"));
    }

    const hashNewPassword = await argon2.hash(newPassword);
    await usersModel.findOneAndUpdate(
      { _id: userId },
      { password: hashNewPassword }
    );

    res.json(sendMessage(true, "Đổi mật khẩu thành công"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// routers.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// routers.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/err", session: false }),
//   function (req, res) {
//     console.log(req.user);
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

export default routers;
