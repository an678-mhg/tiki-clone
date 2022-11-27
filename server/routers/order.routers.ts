import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import cartsModel from "../models/carts.model";
import ordersModel from "../models/orders.model";
import productsModel from "../models/products.model";
import { CreateOrder } from "../types";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @POST
// Create a order
// /api/order/create
routers.post("/create", verifyToken, async (req, res) => {
  const { userId, address, paymentMethod, products } = req.body as CreateOrder;

  if (!userId || !address || !paymentMethod || !products) {
    return res.json(sendMessage(false, "Thiếu tham số!"));
  }

  productsModel
    .find({
      _id: { $in: products.map((item) => item.product) },
    })
    .exec(async (error, data) => {
      if (error) {
        return res
          .status(400)
          .json(sendMessage(false, "Tạo đơn hàng thất bại"));
      }

      const total = data.reduce((final, i: any, index) => {
        final +=
          (i.prices - i.prices * (i.discount / 100)) * products[index].quantity;
        return final;
      }, 0);

      const newOrder = new ordersModel({
        products,
        address,
        paymentMethod,
        total,
        user: userId,
      });

      await newOrder.save();

      await cartsModel.findOneAndDelete({ userId });

      const order = await ordersModel
        .findOne({ _id: newOrder._id })
        .populate("user")
        .populate("products.product")
        .populate("address");

      res.json({ ...sendMessage(true, "Tạo đơn hàng thành công"), order });
    });
});

export default routers;
