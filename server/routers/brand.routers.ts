import { Router } from "express";
import brandsModel from "../models/brands.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @POST
// Create a brand
// /api/brand/create
routers.post("/create", async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số"));
    }

    const newBrand = new brandsModel({ name, image });
    await newBrand.save();

    res.json({
      ...sendMessage(true, "Tạo mới thương hiệu thành công"),
      brand: newBrand,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get all brand
// /api/brand/gets
routers.get("/gets", async (req, res) => {
  try {
    const brands = await brandsModel.find();
    res.json({
      ...sendMessage(true, "Lấy tất cả thương hiệu thành công"),
      brands,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a brand
// /api/brand/get/:id
routers.get("/get/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const brand = await brandsModel.findOne({ _id });

    if (!brand) {
      return res
        .status(400)
        .json(sendMessage(false, "Thương hiệu không tồn tại!"));
    }

    res.json({ ...sendMessage(true, "Lấy thương hiệu thành công!"), brand });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @DELETE
// Delete a brand
// /api/brand/delete/:id
routers.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const isDelete = await brandsModel.findOneAndDelete({ _id });

    if (!isDelete) {
      return res
        .status(400)
        .json(sendMessage(false, "Xóa thương hiệu không thành công!"));
    }

    res.json(sendMessage(true, "Xóa thương hiệu thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Edit a brand
// /api/brand/edit/:id
routers.put("/edit/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số"));
    }

    const isUpdate = await brandsModel.findOneAndUpdate(
      { _id },
      { name, image }
    );

    if (!isUpdate) {
      return res
        .status(400)
        .json(sendMessage(false, "Cập nhật thương hiệu không thành công!"));
    }

    res.json(sendMessage(true, "Cập nhật thương hiệu thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
