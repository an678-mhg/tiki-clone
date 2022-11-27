import { Router } from "express";
import slidersModel from "../models/sliders.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @GET
// Get all slider
// /api/slide/gets
routers.get("/gets", async (req, res) => {
  try {
    const slides = await slidersModel.find();
    res.json({ ...sendMessage(true, "Lấy slide thành công"), slides });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @POST
// Create a slider
// /api/slide/create
routers.post("/create", async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res
      .status(400)
      .json({ ...sendMessage(false, "Thiếu tham số hình ảnh!") });
  }

  try {
    const newSlide = new slidersModel({ image });
    await newSlide.save();
    res.json({
      ...sendMessage(true, "Tạo mới slide thành công"),
      slide: newSlide,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @DELETE
// Delete a slider
// /api/slide/delete/:id
routers.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;

  if (!_id) {
    return res.status(400).json(sendMessage(false, "Cần có id của slide!"));
  }

  try {
    const isDelete = await slidersModel.findOneAndDelete({ _id });

    if (!isDelete) {
      return res
        .status(400)
        .json(sendMessage(false, "Xóa slide không thành công!"));
    }

    res.json(sendMessage(true, "Xóa slide thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
