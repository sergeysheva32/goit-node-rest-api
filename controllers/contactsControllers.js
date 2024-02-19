import { Contact } from "../models/contactModel.js";
import { catchAsync, HttpError } from "../helpers/index.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const keys = Object.keys(req.query);
  const favoriteQuery = keys.some((key) => key === "favorite");

  const skip = (page - 1) * limit;
  
  const opt = {
    owner,
  };

  if (favoriteQuery) {
    opt.favorite = req.query.favorite;
  }

  const result = await Contact.find(opt, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.findById(req.params.id)
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
});

export const createContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndDelete(req.params.id)
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
});

export const updateContactById = catchAsync(async (req, res) => {
  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
});

export const updateFavorite = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
});