import { NextFunction, Request, Response } from "express";

import { env } from "@/config";
import { HTTP_STATUS_CODE } from "@/constants";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"];
  const apiKeyValid = apiKey === env.API_KEY;

  if (!apiKeyValid) {
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: "Unauthorized: Invalid API key" });
  }

  next();
};
