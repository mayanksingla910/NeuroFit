import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string" || !decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const payload = decoded as CustomJwtPayload;
    req.user = { id: payload.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
