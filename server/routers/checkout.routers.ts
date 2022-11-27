import { Router } from "express";
import Stripe from "stripe";
import verifyToken from "../middlewares/verifyToken";
import cartsModel from "../models/carts.model";
import ordersModel from "../models/orders.model";
import productsModel from "../models/products.model";
import usersModel from "../models/users.model";
import { CreateOrder } from "../types";
import sendMessage from "../utils/sendMessage";

const stripe = new Stripe(
  "sk_test_51M8e6VDiffqC8ffYA5hM6hJ2igwxBbBKIevfY8ZFgfbbxlHSIXRxeScwk3VCLqAO5vMuRoUOnhDLXG7cuiDQQWjk00mIqep0HA",
  {
    apiVersion: "2022-11-15",
  }
);

const routers = Router();

routers.post("/", verifyToken, async (req, res) => {
  const { userId } = req.body as CreateOrder;
  const user = await usersModel.findOne({ _id: userId });
  const allCustomer = await stripe.customers.list();
  const existCustomer = allCustomer.data.find(
    (item) => item.email === user?.email
  );

  if (existCustomer) {
    const checkout = await stripe.checkout.sessions.create({
      customer: existCustomer.id,
      success_url: `http://localhost:9000/api/checkout/success`,
      cancel_url: `http://localhost:9000/api/checkout/cancel`,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: "Điện Thoại Samsung Galaxy A13 (4GB/64GB) - Hàng Chính Hãng",
            },
            unit_amount: 4000000,
          },
          quantity: 5,
        },
      ],
    });
    res.json({ checkout });
  }
});

routers.get("/success", (req, res) => {
  console.log(req.body);
  res.send("success");
});

export default routers;
