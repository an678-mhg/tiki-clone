import { Router } from "express";
import categoriesModel from "../models/categories.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @POST
// Create a category
// /api/category/create
routers.post("/create", async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số"));
    }

    const newCategory = new categoriesModel({ name, image });
    await newCategory.save();

    res.json({
      ...sendMessage(true, "Tạo mới danh mục thành công!"),
      category: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get all category
// /api/category/gets
routers.get("/gets", async (req, res) => {
  try {
    const categories = await categoriesModel.find();
    res.json({
      ...sendMessage(true, "Lấy toàn bộ danh mục thành công!"),
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a category
// /api/category/get/:id
routers.get("/get/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const category = await categoriesModel.findOne({ _id });

    if (!category) {
      return res
        .status(400)
        .json(sendMessage(false, "Danh mục này không tồn tại!"));
    }

    res.json({ ...sendMessage(true, "Lấy danh mục thành công!"), category });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @DELETE
// Delete a category
// /api/category/delete/:id
routers.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const isDelete = await categoriesModel.findOneAndDelete({ _id });

    if (!isDelete) {
      return res
        .status(400)
        .json(sendMessage(false, "Xóa danh mục không thành công!"));
    }

    res.json(sendMessage(true, "Xóa danh mục thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Edit a category
// /api/category/edit/:id
routers.put("/edit/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số"));
    }

    const isUpdate = await categoriesModel.findOneAndUpdate(
      { _id: _id },
      { name: name, image: image }
    );

    if (!isUpdate) {
      return res
        .status(400)
        .json(sendMessage(false, "Cập nhật danh mục không thành công!"));
    }

    res.json(sendMessage(true, "Cập nhật danh mục thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
