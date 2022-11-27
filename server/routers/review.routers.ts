import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import productsModel from "../models/products.model";
import reviewsModel from "../models/reviews.model";
import sendMessage from "../utils/sendMessage";
import updateReview from "../utils/updateReview";

const routers = Router();

// @GET
// Get all review
// /api/review/gets
routers.get("/gets/:id", async (req, res) => {
  let option = {
    page: 1,
    limit: 5,
  };

  let filter: any = {};

  filter._id = req.params.id;

  if (req.query.page) {
    option.page = +req.query.page;
  }

  if (req.query.limit) {
    option.limit = +req.query.limit;
  }

  if (req.query.isHaveImage) {
    filter.images = { $size: { $gte: 1 } };
  }

  if (req.query.ratings) {
    filter.ratings = +req.query.ratings;
  }

  try {
    const reviews = await reviewsModel.paginate(filter, option);
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @POST
// Create a review
// /api/review/create
routers.post("/create", verifyToken, async (req, res) => {
  const { product, ratings, comment } = req.body;
  const userId = req.body.userId;

  if (!product || !comment.trim() || !ratings) {
    return res.status(400).json(sendMessage(false, "Thiếu tham số!"));
  }

  try {
    const newReviews = new reviewsModel({
      user: userId,
      product,
      ratings,
      comment,
      likes: [],
      images: req.body.images || [],
      parent: null,
    });

    await newReviews.save();

    updateReview(product);

    res.json({
      ...sendMessage(true, "Tạo mới đánh giá thành công"),
      review: newReviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @PUT
// Edit a review
// /api/review/edit/:id
routers.put("/edit/:id", verifyToken, async (req, res) => {
  const { comment } = req.body;
  const userId = req.body.userId;
  const _id = req.params.id;

  if (!comment?.trim()) {
    return res.status(400).json(sendMessage(false, "Thiếu tham số!"));
  }

  try {
    const existReview = await reviewsModel.findOne({ _id });

    if ((existReview as any)?.user.toString() !== userId) {
      return res
        .status(404)
        .json(sendMessage(false, "Bạn không có quyền cập nhật đánh giá này!"));
    }

    (existReview as any).comment = comment;

    await existReview?.save();

    res.json({ ...sendMessage(true, "Cập nhật đánh giá thành công") });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @DELETE
// Delete a review
// /api/review/delete/:id
routers.delete("/delete/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;

  try {
    const existReview = await reviewsModel.findOne({ _id });

    if ((existReview as any).user.toString() !== userId) {
      return res
        .status(404)
        .json(sendMessage(false, "Bạn không có quyền xóa đánh giá này!"));
    }

    const isDelete = await reviewsModel.findOneAndDelete({ _id });

    if (!isDelete) {
      return res
        .status(404)
        .json(sendMessage(false, "Xóa đánh giá không thành công"));
    }

    updateReview((existReview as any).product);

    res.json(sendMessage(true, "Xóa đánh giá thành công"));
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @GET
// Get a review
// /api/review/get/:id
routers.get("/get/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const review = await reviewsModel.findOne({ _id });
    res.json({ ...sendMessage(true, "Lấy đánh giá thành công"), review });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

// @POST
// Reply a review
// /api/review/reply
routers.post("/reply", verifyToken, async (req, res) => {
  const { product, comment, parent } = req.body;
  const userId = req.body.userId;

  if (!product || !comment || !parent) {
    return res.status(400).json(sendMessage(false, "Thiếu tham số!"));
  }

  try {
    const newReply = new reviewsModel({
      product,
      comment,
      parent,
      user: userId,
    });
    await newReply.save();

    res.json({
      ...sendMessage(true, "Trả lời đánh giá thành công"),
      reply: newReply,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ...sendMessage(false, "Server đang gặp lỗi!"), error });
  }
});

export default routers;
