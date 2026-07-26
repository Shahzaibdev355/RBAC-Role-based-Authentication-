import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { AppError } from "../utils/appError";

export const validate =
  (schema: Joi.Schema, source = "body") =>
    (req: Request, res: Response, next: NextFunction) => {

      const data =
        source === "query"
          ? req.query
          : req.body;

      const { error, value } =
        schema.validate(
          data,
          {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
          }
        );

      if (error) {
        const message =
          error.details
            .map(x => x.message)
            .join(", ");

        return next(
          new AppError(message, 400)
        );
      }

      if (source === "query") {
        req.query = value;
      } else {
        req.body = value;
      }

      next();
    };