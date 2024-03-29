import { isValidObjectId } from "mongoose";
import { HttpError } from "./index.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }

  next();
};