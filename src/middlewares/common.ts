import { Request, Response, NextFunction } from "express";
import config from "../config";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next(new Error(`Not Found ${req.originalUrl}`));
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    result: null,
    error: config.isDev ? error.stack : true
  });
  next();
};
