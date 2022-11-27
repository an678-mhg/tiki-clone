// config app
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import connectDB from "../utils/connectDB";
// routers
import authRouters from "../routers/auth.routers";
import productRouters from "../routers/product.routers";
import categoryRouters from "../routers/category.routers";
import brandRouters from "../routers/brand.routers";
import cartRouters from "../routers/cart.routers";
import slideRouters from "../routers/slide.routers";
import reviewRouters from "../routers/review.routers";
import userRouters from "../routers/user.routers";
import addressRouters from "../routers/address.routers";
import orderRouters from "../routers/order.routers";
import checkoutRouters from "../routers/checkout.routers";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/checkout", checkoutRouters);
app.use("/api/order", orderRouters);
app.use("/api/address", addressRouters);
app.use("/api/auth", authRouters);
app.use("/api/product", productRouters);
app.use("/api/category", categoryRouters);
app.use("/api/brand", brandRouters);
app.use("/api/cart", cartRouters);
app.use("/api/slide", slideRouters);
app.use("/api/review", reviewRouters);
app.use("/api/user", userRouters);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
