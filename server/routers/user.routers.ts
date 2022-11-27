import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import usersModel from "../models/users.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

routers.put("/edit", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const { username, email, phone, gender, avatar } = req.body;

  if (!username || !email || !phone || !gender)
    return res.status(400).json(sendMessage(false, "Thiếu tham số"));

  try {
    await usersModel.findOneAndUpdate(
      { _id: userId },
      { username, email, phone, gender, avatar }
    );
    res.json(sendMessage(true, "Cập nhật thông tin người dùng thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
