import { Router } from "express";
import productsModel from "../models/products.model";
import sendMessage from "../utils/sendMessage";

const routers = Router();

// @POST
// Create a product
// /api/product/create
routers.post("/create", async (req, res) => {
  try {
    const {
      name,
      images,
      category,
      brand,
      prices,
      discount,
      description,
      attributes,
      status,
      slug,
    } = req.body;

    if (
      !name ||
      !images ||
      !category ||
      !brand ||
      !prices ||
      !discount ||
      !description ||
      !attributes ||
      !status ||
      !slug
    ) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số!"));
    }

    const newProduct = new productsModel({
      name,
      images,
      category,
      brand,
      prices,
      discount,
      description,
      attributes,
      status,
      slug,
    });
    await newProduct.save();

    res.status(203).json({
      ...sendMessage(true, "Tạo sản phẩm thành công!"),
      product: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get all product
// /api/product/gets
routers.get("/gets", async (req, res) => {
  let options: any = {
    page: 1,
    limit: 5,
  };

  let filter: any = {};

  if (req.query.page) {
    options.page = +req.query.page;
  }

  if (req.query.limit) {
    options.limit = +req.query.limit;
  }

  if (req.query.sort) {
    options.sort = { prices: req.query.sort };
  }

  if (req.query.populate) {
    options.populate = ["category", "brand"];
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.brand) {
    filter.brand = { $in: (req.query.brand as string).split(",") };
  }

  if (req.query.starts) {
    filter.review = { $lte: +req.query.starts };
  }

  if (req.query.gte && !req.query.lte) {
    filter.prices = { $gte: +req.query.gte };
  }

  if (req.query.lte && !req.query.gte) {
    filter.prices = { $lte: +req.query.lte };
  }

  if (req.query.lte && req.query.gte) {
    filter.prices = { $gte: +req.query.gte, $lte: +req.query.lte };
  }

  try {
    const products = await productsModel.paginate(
      { ...filter, status: true },
      options
    );
    res.json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a product
// /api/get/:id
routers.get("/get/:slug", async (req, res) => {
  try {
    const slug = req.params.slug as string;

    if (!slug) {
      return res
        .status(400)
        .json(sendMessage(false, "Cần có id của sản phẩm!"));
    }

    const product = await productsModel
      .findOne({ slug })
      .populate("category")
      .populate("brand");

    if (!product) {
      return res
        .status(400)
        .json(
          sendMessage(false, `Không tìm thấy sản phẩm nào có id là ${slug}`)
        );
    }

    res.json({
      ...sendMessage(true, "Lấy thông tin sản phẩm thành công"),
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @DELETE
// Delete a product
// /api/product/delete/:id
routers.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    if (!_id) {
      return res
        .status(400)
        .json(sendMessage(false, "Cần có id của sản phẩm!"));
    }

    const isDelete = await productsModel.findOneAndDelete({ _id });

    if (!isDelete) {
      return res
        .status(400)
        .json(sendMessage(false, "Xóa sản phẩm không thành công!"));
    }

    res.json(sendMessage(true, "Xóa sản phẩm thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Edit a product
// /api/product/edit/:id
routers.put("/edit/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const {
      name,
      images,
      category,
      brand,
      prices,
      discount,
      description,
      attributes,
      status,
    } = req.body;

    if (
      !name ||
      !images ||
      !category ||
      !brand ||
      !prices ||
      !discount ||
      !description ||
      !attributes ||
      !status
    ) {
      return res.status(400).json(sendMessage(false, "Thiếu tham số!"));
    }

    const isUpdate = await productsModel.findOneAndUpdate(
      { _id },
      {
        name,
        images,
        category,
        brand,
        prices,
        discount,
        description,
        attributes,
        status,
      }
    );

    if (!isUpdate) {
      return res
        .status(400)
        .json(sendMessage(false, "Cập nhật sản phẩm không thành công!"));
    }

    res.json(sendMessage(true, "Cập nhật sản phẩm thành công!"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get similar product
// /api/product/similar/:slug
routers.get("/similar/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const product: any = await productsModel.findOne({ slug });
    const category = product?.category;

    if (category) {
      const similar = await productsModel
        .find({
          category,
          _id: { $ne: product._id },
        })
        .limit(5)
        .sort("updatedAt");

      const other = await productsModel
        .find({
          _id: { $nin: similar.map((item) => item._id), $ne: product._id },
        })
        .sort("updatedAt");

      res.json({
        ...sendMessage(true, "Lấy sản phẩm tương tự thành công"),
        products: [...similar, ...other].slice(0, 5),
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
