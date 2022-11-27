import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import cartsModel from "../models/carts.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @PUT
// Upadte a cart
// /api/cart/edit
routers.put("/edit", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const product = req.body.product as string;
  const quantity = Number(req.body.quantity);

  try {
    const existCart = await cartsModel.findOne({ userId });

    if (!existCart) {
      const newCart = new cartsModel({
        userId,
        products: [{ product, quantity: quantity }],
      });
      await newCart.save();
      return res.json(sendMessage(true, "Cập nhật giỏ hàng thành công"));
    }

    const isProductIncart = existCart.products.some(
      (item) => (item.product as any).toString() === product
    );

    if (isProductIncart) {
      if (existCart?.products) {
        existCart.products = existCart.products.map((item) => {
          if ((item.product as any)?.toString() === product) {
            return {
              ...item,
              quantity: quantity
                ? Number(item.quantity) + quantity
                : Number(item.quantity) + 1,
            };
          }
          return item;
        });
      }
    } else {
      existCart.products = [
        ...existCart.products,
        { product, quantity: quantity },
      ];
    }

    await existCart.save();

    res.json(sendMessage(true, "Cập nhập giỏ hàng thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a cart
// /api/cart/get
routers.get("/get", verifyToken, async (req, res) => {
  const userId = req.body.userId;

  try {
    const products = await cartsModel
      .findOne({ userId })
      .populate("products.product");

    res.json({
      ...sendMessage(true, "Lấy giỏ hàng thành công"),
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Add cart quantity
// /api/cart/plus/:productId
routers.put("/plus/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId as string;
  const userId = req.body.userId;

  try {
    const existCart = await cartsModel.findOne({ userId });

    if (existCart?.products) {
      existCart.products = existCart.products.map((item) => {
        if ((item.product as any)?.toString() === productId) {
          return {
            ...item,
            quantity: Number(item.quantity) + 1,
          };
        }
        return item;
      });
    }

    await existCart?.save();

    res.json(sendMessage(true, "Cập nhật số lượng của sản phẩm thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Minus cart quantity
// /api/cart/minus/:productId
routers.put("/minus/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId as string;
  const userId = req.body.userId;

  try {
    const existCart = await cartsModel.findOne({ userId });

    if (existCart?.products) {
      existCart.products = existCart.products.map((item) => {
        if ((item.product as any)?.toString() === productId) {
          return {
            ...item,
            quantity: Number(item.quantity) - 1,
          };
        }
        return item;
      });
    }

    await existCart?.save();

    res.json(sendMessage(true, "Cập nhật số lượng của sản phẩm thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Delete a product to cart
// /api/cart/delete/:productId
routers.put("/delete/:productId", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const productId = req.params.productId;

  try {
    const existCart = await cartsModel.findOne({ userId });

    if (
      existCart?.products.some(
        (item) => (item.product as any).toString() === productId
      )
    ) {
      existCart.products = existCart.products.filter(
        (item) => (item.product as any).toString() !== productId
      );
      await existCart.save();
      return res.json(
        sendMessage(true, "Xóa sản phẩm trong giỏ hàng thành công")
      );
    }

    res
      .status(400)
      .json(sendMessage(false, "Sản phẩm không tồn tại trong giỏ hàng!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
