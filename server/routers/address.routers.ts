import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import addressModel from "../models/address.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @POST
// Create a address
// /api/address/create
routers.post("/create", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const { address, name, phone, defaultAddress } = req.body;

  if (!address || !name || !phone) {
    return res.status(400).json(sendMessage(false, "Thiếu tham số"));
  }

  try {
    const newAddress = new addressModel({
      name,
      address,
      phone,
      user: userId,
      default: defaultAddress,
    });
    await newAddress.save();

    res.json({
      ...sendMessage(true, "Tạo mới địa chỉ thành công!"),
      address: newAddress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get all address
// /api/address/gets
routers.get("/gets", verifyToken, async (req, res) => {
  const userId = req.body.userId;

  try {
    const address = await addressModel.find({ user: userId });
    res.json({
      ...sendMessage(true, "Lấy toàn bộ địa chỉ thành công"),
      address,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Change address default
// /api/address/edit/default
routers.put("/edit/default/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;

  try {
    const existAddress = await addressModel.findOne({ _id });

    if ((existAddress?.user as any).toString() !== userId) {
      return res
        .status(400)
        .json(
          sendMessage(false, "Bạn đang đổi một địa chỉ không phải của bạn!")
        );
    }

    await addressModel.findOneAndUpdate({ _id }, { default: true });

    addressModel
      .find({ _id: { $nin: [existAddress?._id] } })
      .exec(async (err, address) => {
        if (err) return;
        address.forEach(async (item) => {
          item.default = false;
          await item.save();
        });
      });

    res.json(sendMessage(true, "Cập nhật địa chỉ mặc định thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @DELETE
// Delete a address
// /api/address/delete/:id
routers.delete("/delete/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;

  try {
    const existAddress = await addressModel.findOne({ _id });

    if ((existAddress?.user as any).toString() !== userId) {
      return res
        .status(400)
        .json(
          sendMessage(false, "Bạn đang xóa một địa chỉ không phải của bạn!")
        );
    }

    await addressModel.findOneAndDelete({ _id });

    res.json(sendMessage(true, "Xóa địa chỉ thành công"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Edit a address
// /api/address/edit/:id
routers.put("/edit/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;

  const { name, phone, address } = req.body;

  try {
    const existAddress = await addressModel.findOne({ _id });

    if ((existAddress?.user as any).toString() !== userId) {
      return res
        .status(400)
        .json(
          sendMessage(false, "Bạn đang sửa một địa chỉ không phải của bạn!")
        );
    }

    await addressModel.findOneAndUpdate({ _id }, { phone, name, address });

    res.json(sendMessage(true, "Cập nhật thành công địa chỉ"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a address
// /api/address/get/:id
routers.get("/get/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  try {
    const address = await addressModel.findOne({ _id });
    res.json({ ...sendMessage(true, "Lấy thành công địa chỉ"), address });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get default address
// /api/address/default/get
routers.get("/default/get", verifyToken, async (req, res) => {
  const userId = req.body.userId;

  try {
    const address = await addressModel.findOne({ user: userId, default: true });
    res.json({
      ...sendMessage(true, "Lấy địa chỉ mặc định thành công"),
      address,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
