import jwt from "jsonwebtoken";
import sendMessage from "../utils/sendMessage";
import type { Response, NextFunction, Request } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json(sendMessage(false, "Bạn chưa đăng nhập!"));

  try {
    const decoded = jwt.verify(token, process.env.JWT as string) as {
      userId: string;
    };

    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json(sendMessage(false, "Token không hợp lệ!"));
  }
};

export default verifyToken;
